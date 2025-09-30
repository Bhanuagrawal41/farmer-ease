import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST: Save contact form
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (Optional) GET: View all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
