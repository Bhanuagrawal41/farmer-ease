# FarmEase Project Architecture

This document describes the **current architecture** of the FarmEase application. It is a **MERN‑style** web app (MongoDB + Express + React + Node) with a few auxiliary services.

---

## 1. High‑level stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Vite (dev server), React 19, Tailwind CSS 4, Framer Motion, Redux Toolkit, React‑Router‑DOM, Lucide icons |
| **Backend (API)** | Node.js + Express, written in ES‑modules (`type: "module"`), CORS enabled, dotenv for env vars |
| **Database** | MongoDB (local or Atlas) accessed via the native MongoDB driver or Mongoose (if added later) |
| **AI / external services** | `ai‑services/api.py` – a Python FastAPI (or Flask) service that can be called from the backend for any AI‑related tasks (e.g., image generation, text summarisation). |
| **Other utilities** | Python scraper (`Backend/python‑scraper`), `.env` files for credentials, `package.json` scripts for dev/build, `vite.config.js` for Tailwind integration. |

---

## 2. Frontend structure (`frontend/`)

```
frontend/
├─ src/
│   ├─ main.jsx            # React entry point
│   ├─ App.jsx             # Root component (router, layout)
│   ├─ components/         # UI components (Header, Footer, Dashboard, etc.)
│   └─ assets/             # Images, icons, videos
├─ public/
│   └─ index.html          # Static HTML template
├─ postcss.config.js      # PostCSS with Tailwind plugin
├─ tailwind.config.js     # Tailwind custom configuration (colors, fonts)
├─ vite.config.js         # Vite + Tailwind plugin integration
├─ .env.example           # Environment template (VITE_API_URL, etc.)
└─ package.json           # Scripts, dependencies, devDependencies
```

### Key points
* **Tailwind** provides the design system (custom colors, typography).
* **Framer Motion** is used for animated UI transitions.
* **Redux Toolkit** holds global app state (e.g., user session, farm data).
* The app is built with **Vite** for fast HMR and an easy dev server.

---

## 3. Backend structure (`Backend/`)

```
Backend/
├─ server.js               # Main Express server (ESM)
├─ routes/
│   ├─ auth.js             # Authentication endpoints (JWT / session)
│   ├─ farm.js             # CRUD routes for farm entities
│   └─ ...                 # Additional domain routes
├─ models/                 # (optional) Mongoose schemas
├─ python-scraper/         # Helper Python scraper (invoked via child_process)
├─ .env                    # Database URI, secret keys, etc.
└─ package.json            # Express, dotenv, cors, mongodb/mongoose
```

### Important middleware
* `cors({ origin: "*" })` – allows the React front‑end to call the API.
* `express.json()` – parses JSON bodies.
* `dotenv` – loads environment variables (`MONGODB_URI`, `PORT`, `JWT_SECRET`).

---

## 4. AI / auxiliary services (`ai‑services/`)

```
ai-services/
├─ api.py                  # FastAPI (or Flask) exposing AI endpoints
│   ├─ /generate‑text      # Example: call Gemini or OpenAI
│   └─ /image‑generate     # Example: call an image model
├─ requirements.txt        # Python dependencies (fastapi, uvicorn, google‑genai, etc.)
└─ .env                    # API keys for Gemini, Tavily, etc.
```

The backend can communicate with this service via HTTP (`axios` or `fetch`). This keeps heavy model calls out of the Node process and leverages the existing Python AI tooling.

---

## 5. Development workflow

1. **Install dependencies**
   ```bash
   # Frontend
   cd frontend && npm install
   # Backend
   cd ../Backend && npm install
   # AI service (optional)
   cd ../ai-services && pip install -r requirements.txt
   ```
2. **Configure environment** – copy the `.env.example` files to `.env` and fill in the values (MongoDB URI, API keys, etc.).
3. **Run services**
   ```bash
   # Frontend dev server (Vite)
   cd frontend && npm run dev   # http://localhost:5173

   # Backend API
   cd ../Backend && node server.js   # http://localhost:5000

   # AI service (if used)
   cd ../ai-services && uvicorn api:app --reload   # http://localhost:8000
   ```
4. Open the browser at the frontend URL, log in (if auth enabled), and interact with the farm management UI.

---

## 6. Deployment considerations

* **Frontend** – build with `npm run build`; serve static files via a CDN or a Node static‑file server.
* **Backend** – run with a process manager (PM2, Docker, or a cloud function). Ensure the `MONGODB_URI` points to a production cluster.
* **AI service** – can be containerised separately; expose only the needed endpoints and keep API keys secure.
* **Environment variables** – never commit real secrets; use a secrets manager or platform‑specific config (e.g., Vercel, Render, Railway).

---

## 7. Quick reference to scripts

| Script | What it does |
|--------|--------------|
| `frontend/npm run dev` | Starts Vite dev server with HMR |
| `frontend/npm run build` | Produces optimized static assets |
| `Backend/npm run dev` (or `node server.js`) | Launches Express API |
| `ai‑services/uvicorn api:app --reload` | Runs the Python AI microservice |

---

*This document reflects the current state of the FarmEase codebase after removing the experimental online‑exam‑generator scaffold.*

