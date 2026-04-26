import express from "express";
import crypto from "crypto";
import supabase from "../lib/supabase.js";

const router = express.Router();
const webhookSecret = process.env.PAYCHANGU_WEBHOOK_SECRET;

router.post("/", async (req, res) => {
  try {
    console.log("Webhook hit!");

    const rawBody = req.body;
    const payload = Buffer.isBuffer(rawBody)
      ? rawBody.toString("utf8")
      : String(rawBody ?? "");

    const signature = req.headers["signature"];

    if (!webhookSecret) {
      return res.status(500).send("Webhook not configured");
    }

    if (!signature) {
      return res.status(400).send("Missing signature");
    }

    // verify signature
    const computed = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");

    if (computed !== signature) {
      console.log("Invalid signature");
      return res.status(403).send("Invalid signature");
    }

    const data = JSON.parse(payload);

    const reference = data.tx_ref;
    const amount = Number(data.amount);
    const status = data.status;

    if (status !== "success" || !reference || !amount) {
      return res.sendStatus(200);
    }

    // 1. fetch user
    const { data: user, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("payment_reference", reference)
      .single();

    if (error || !user) {
      console.log("User not found");
      return res.sendStatus(200);
    }

    // 2. update payment
    const newPaidAmount = (user.paid_amount || 0) + amount;
    const totalFee = user.registration_fee || 5000;

    const payment_status =
      newPaidAmount >= totalFee ? "Paid" : "Partially Paid";

    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        paid_amount: newPaidAmount,
        payment_status,
      })
      .eq("payment_reference", reference);

    if (updateError) {
      console.log("DB update error", updateError);
      return res.sendStatus(200);
    }

    // 3. EMIT EVENT (this replaces receipt/email logic)
    await supabase.from("payment_events").insert([
      {
        type: "PAYMENT_SUCCESS",
        reference,
        payload: {
          amount,
          payment_status,
          email: user.email,
          full_name: user.first_name + " " + user.last_name,
          course: user.course_id,
        },
      },
    ]);

    console.log("Event emitted for receipt processing");

    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Webhook error");
  }
});

export default router;