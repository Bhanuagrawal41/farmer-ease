// import express from "express";
// import Notice from "../models/Notice.js";

// const router = express.Router();

// // GET /api/notices?limit=50&source=IKM
// router.get("/", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 50;
//     const source = req.query.source;
//     const since = req.query.since; // ISO date

//     const filter = {};
//     if (source) filter.source = source;
//     if (since) filter.date = { $gte: since };

//     const notices = await Notice.find(filter)
//       .sort({ date: -1 })
//       .limit(limit);

//     res.json(notices);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import Notice from "../models/Notice.js";  // your mongoose model
// If you want scraping inside Node, import scraper function here
// import { scrapeAndStore } from "../services/scraper.js";

const router = express.Router();

// GET all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 }); // newest first
    res.json({ total: notices.length, news: notices });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
});

// OPTIONAL: Trigger scraping
// router.get("/scrape", async (req, res) => {
//   try {
//     const insertedCount = await scrapeAndStore();
//     res.json({ status: "completed", inserted: insertedCount });
//   } catch (err) {
//     res.status(500).json({ status: "error", message: err.message });
//   }
// });

export default router;