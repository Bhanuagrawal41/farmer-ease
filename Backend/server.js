import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import noticeroutes from "./routes/notices.js";

dotenv.config();
const app = express();

// --- Configuration ---
// The Python Flask server is running on this explicit IPv4 address and port
const PYTHON_FLASK_URL = "http://127.0.0.1:5001"; 

// --- CRITICAL MIDDLEWARE FIX ---
// 1. JSON Middleware: Handles standard text/voice payloads.
app.use(express.json({ limit: '1mb' })); 

// 2. RAW Body Parser: CRITICAL for handling the raw binary data of the uploaded image file.
// This must come BEFORE the routes that use it (/api/ai/image).
app.use(bodyParser.raw({ 
    type: 'multipart/form-data', 
    limit: '10mb' // Increased limit for image uploads
})); 

// 3. CORS and general setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// --- Proxy Utility Function ---
// Handles forwarding the request to the Python Flask server
const proxyToPython = async (req, res, endpoint) => {
    try {
        let bodyToSend;
        let headers = {};

        // 1. Determine if the request is a file upload
        const isFileUpload = req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data');
        
        if (isFileUpload) {
            // For file uploads, the body is already parsed into a buffer by bodyParser.raw()
            bodyToSend = req.body; 
            headers = req.headers; // Forward the original headers (including boundary)
        } else {
            // For JSON (text/voice), the body is already parsed by express.json()
            bodyToSend = req.body;
            headers = { 'Content-Type': 'application/json' };
        }
        
        // --- AXIOS PROXY CALL ---
        const aiResponse = await axios.post(`${PYTHON_FLASK_URL}/ai/${endpoint}`, bodyToSend, {
            // Send the exact headers Flask needs
            headers: {
                ...headers,
                'X-Forwarded-For': req.ip,
                // Do not explicitly set Content-Type for FormData, but include the boundary 
                // data from the original request.
            },
            // Ensure the response timeout is sufficient
            timeout: 60000, // 60 seconds for TinyLlama inference
        });

        // Send Python's response back to the frontend
        res.json(aiResponse.data);

    } catch (error) {
        // Log the failure and return a clear error
        console.error(`❌ Proxy Error to Flask (${endpoint}):`, error.message);
        
        // Send a 503 status if connection is refused (likely Python server is down)
        const statusCode = error.code === 'ECONNREFUSED' ? 503 : 500;

        res.status(statusCode).json({
            error: `AI Core Offline or Processing Failure. Status: ${statusCode}`,
            assistant: { content: "Error: The local AI processing unit is currently offline. Please check the Python console for details." }
        });
    }
};

// --- STANDARD ROUTES ---
app.use("/api/notices", noticeroutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes); 
app.use("/api/weather", weatherRoutes);


// 🛑 NEW MULTI-MODAL PROXY ENDPOINTS (THE CORE OF YOUR SOLUTION)

// 1. Text Input (Frontend calls /api/chat)
app.post("/api/chat", (req, res) => {
    proxyToPython(req, res, 'text');
});

// 2. Image Input (Frontend calls /api/ai/image)
app.post("/api/ai/image", (req, res) => {
    // This uses the raw body buffer from the middleware above.
    proxyToPython(req, res, 'image');
});

// 3. Voice Input (Frontend calls /api/ai/voice)
app.post("/api/ai/voice", (req, res) => {
    proxyToPython(req, res, 'voice');
});


// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// // 1. IMPORT THE NEW PROXY MIDDLEWARE
// import { createProxyMiddleware } from "http-proxy-middleware";

// import authRoutes from "./routes/authRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import weatherRoutes from "./routes/weatherRoutes.js";
// import noticeroutes from "./routes/notices.js";

// dotenv.config();
// const app = express();

// // --- Configuration ---
// const PYTHON_FLASK_URL = "http://127.0.0.1:5001";

// // --- Middleware Setup ---
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// // This is still needed for your standard routes like /api/auth
// app.use(express.json({ limit: '1mb' }));

// // --- STANDARD ROUTES ---
// app.use("/api/notices", noticeroutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/weather", weatherRoutes);


// // ========================================================================
// // --- REPLACEMENT START ---
// // The old `bodyParser.raw`, `proxyToPython` function, and three `app.post`
// // routes have been replaced by the more reliable proxy middleware below.
// // ========================================================================

// // 2. CONFIGURE THE AI PROXY
// // This one proxy will intelligently handle all requests starting with /api/ai
// // and forward them to your Python server. It correctly streams file uploads.
// const aiProxy = createProxyMiddleware({
//     target: PYTHON_FLASK_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         // This rule removes '/api' from the path.
//         // So, a request to '/api/ai/image' becomes '/ai/image' for the Python server.
//         // A request to '/api/chat' becomes '/chat' for the Python server.
//         '^/api': '/',
//     },
//     // Custom error handler to keep your original error message format
//     onError: (err, req, res) => {
//         console.error(`❌ Proxy Error:`, err.message);
//         res.status(503).json({
//             error: "AI Core Offline or Processing Failure. Status: 503",
//             assistant: { content: "Error: The local AI processing unit is currently offline. Please check the Python console for details." }
//         });
//     }
// });


// // 3. APPLY THE PROXY TO RELEVANT ROUTES
// // All requests to /api/chat or /api/ai/* will now be handled by the proxy.
// app.use('/api/chat', aiProxy);
// app.use('/api/ai', aiProxy);

// // ========================================================================
// // --- REPLACEMENT END ---
// // ========================================================================


// // --- MongoDB Connection ---
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));