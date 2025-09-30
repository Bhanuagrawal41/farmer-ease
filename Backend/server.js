// require('dotenv').config();
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import axios from "axios";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import weatherRoutes from "./routes/weatherRoutes.js";
// import noticeroutes from "./routes/notices.js";

// dotenv.config();
// const app = express();

// // --- Configuration ---
// // The Python Flask server is running on this explicit IPv4 address and port
// const PYTHON_FLASK_URL = "http://127.0.0.1:5001"; 

// // --- CRITICAL MIDDLEWARE FIX ---
// // 1. JSON Middleware: Handles standard text/voice payloads.
// app.use(express.json({ limit: '1mb' })); 

// // 2. RAW Body Parser: CRITICAL for handling the raw binary data of the uploaded image file.
// // This must come BEFORE the routes that use it (/api/ai/image).
// app.use(bodyParser.raw({ 
//     type: 'multipart/form-data', 
//     limit: '10mb' // Increased limit for image uploads
// })); 

// // 3. CORS and general setup
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// // --- Proxy Utility Function ---
// // Handles forwarding the request to the Python Flask server
// const proxyToPython = async (req, res, endpoint) => {
//     try {
//         let bodyToSend;
//         let headers = {};

//         // 1. Determine if the request is a file upload
//         const isFileUpload = req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data');
        
//         if (isFileUpload) {
//             // For file uploads, the body is already parsed into a buffer by bodyParser.raw()
//             bodyToSend = req.body; 
//             headers = req.headers; // Forward the original headers (including boundary)
//         } else {
//             // For JSON (text/voice), the body is already parsed by express.json()
//             bodyToSend = req.body;
//             headers = { 'Content-Type': 'application/json' };
//         }
        
//         // --- AXIOS PROXY CALL ---
//         const aiResponse = await axios.post(`${PYTHON_FLASK_URL}/ai/${endpoint}`, bodyToSend, {
//             // Send the exact headers Flask needs
//             headers: {
//                 ...headers,
//                 'X-Forwarded-For': req.ip,
//                 // Do not explicitly set Content-Type for FormData, but include the boundary 
//                 // data from the original request.
//             },
//             // Ensure the response timeout is sufficient
//             timeout: 60000, // 60 seconds for TinyLlama inference
//         });

//         // Send Python's response back to the frontend
//         res.json(aiResponse.data);

//     } catch (error) {
//         // Log the failure and return a clear error
//         console.error(`❌ Proxy Error to Flask (${endpoint}):`, error.message);
        
//         // Send a 503 status if connection is refused (likely Python server is down)
//         const statusCode = error.code === 'ECONNREFUSED' ? 503 : 500;

//         res.status(statusCode).json({
//             error: `AI Core Offline or Processing Failure. Status: ${statusCode}`,
//             assistant: { content: "Error: The local AI processing unit is currently offline. Please check the Python console for details." }
//         });
//     }
// };

// // --- STANDARD ROUTES ---
// app.use("/api/notices", noticeroutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/contact", contactRoutes); 
// app.use("/api/weather", weatherRoutes);


// // 🛑 NEW MULTI-MODAL PROXY ENDPOINTS (THE CORE OF YOUR SOLUTION)

// // 1. Text Input (Frontend calls /api/chat)
// app.post("/api/chat", (req, res) => {
//     proxyToPython(req, res, 'text');
// });

// // 2. Image Input (Frontend calls /api/ai/image)
// app.post("/api/ai/image", (req, res) => {
//     // This uses the raw body buffer from the middleware above.
//     proxyToPython(req, res, 'image');
// });

// // 3. Voice Input (Frontend calls /api/ai/voice)
// app.post("/api/ai/voice", (req, res) => {
//     proxyToPython(req, res, 'voice');
// });


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



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import multer from "multer"; // Use multer for file uploads
import FormData from "form-data"; // To forward files

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import noticeroutes from "./routes/notices.js";

// --- Configuration ---
dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;

// FIX #1: Use environment variables for URLs
const PYTHON_FLASK_URL = process.env.PYTHON_FLASK_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// --- Middleware ---
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' })); // Middleware for JSON payloads

// FIX #3: Configure multer for in-memory file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Proxy Utility Function ---
const proxyToPython = async (req, res, endpoint) => {
    try {
        const aiResponse = await axios.post(`${PYTHON_FLASK_URL}/ai/${endpoint}`, req.body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 60000, // 60 seconds
        });
        res.json(aiResponse.data);
    } catch (error) {
        console.error(`❌ Proxy Error to Flask (${endpoint}):`, error.message);
        const statusCode = error.code === 'ECONNREFUSED' ? 503 : 500;
        res.status(statusCode).json({
            error: `AI Core Offline or Processing Failure. Status: ${statusCode}`,
            assistant: { content: "Error: The local AI processing unit is currently offline." }
        });
    }
};

// --- STANDARD ROUTES ---
app.use("/api/notices", noticeroutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/weather", weatherRoutes);

// --- AI PROXY ENDPOINTS ---

// 1. Text and Voice Input (JSON)
app.post("/api/chat", (req, res) => proxyToPython(req, res, 'text'));
app.post("/api/ai/voice", (req, res) => proxyToPython(req, res, 'voice'));

// 2. Image Input (Multipart Form Data)
app.post("/api/ai/image", upload.single('image'), async (req, res) => {
    // 'image' must match the field name from the frontend form
    if (!req.file) {
        return res.status(400).json({ error: "No image file provided." });
    }

    try {
        // FIX #3: Use FormData to correctly proxy the file
        const form = new FormData();
        form.append('image', req.file.buffer, { filename: req.file.originalname });

        const aiResponse = await axios.post(`${PYTHON_FLASK_URL}/ai/image`, form, {
            headers: form.getHeaders(),
            timeout: 60000,
        });

        res.json(aiResponse.data);
    } catch (error) {
        console.error(`❌ Proxy Error to Flask (image):`, error.message);
        const statusCode = error.code === 'ECONNREFUSED' ? 503 : 500;
        res.status(statusCode).json({ error: `AI Core Offline or Processing Failure. Status: ${statusCode}` });
    }
});

// --- MongoDB Connection & Server Start ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));