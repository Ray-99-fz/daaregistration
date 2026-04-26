// backend/routes/emailRoutes.js
import express from "express";
import { sendWelcomeEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/welcome", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await sendWelcomeEmail(email, name);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;