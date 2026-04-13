const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const supabase = require("../lib/supabase");

const webhookSecret = process.env.PAYCHANGU_WEBHOOK_SECRET;

router.post("/", async (req, res) => {
  try {
    const rawBody = req.body;
    const payload = Buffer.isBuffer(rawBody) ? rawBody.toString("utf8") : String(rawBody ?? "");
    const signature = req.headers["signature"];

    if (!webhookSecret) {
      return res.status(500).send("Webhook not configured");
    }

    if (!signature) {
      return res.status(400).send("Missing signature");
    }

    const computed = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");

    if (computed !== signature) {
      return res.status(403).send("Invalid signature");
    }

    const data = JSON.parse(payload);

    const reference = data.reference;
    const amount = data.amount;
    const status = data.status;

    if (status === "success" && reference && amount) {
      await supabase.from("registrations").update({ payment_status: "Paid", paid_amount: amount }).eq("payment_reference", reference);
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Webhook error");
  }
});

module.exports = router;
