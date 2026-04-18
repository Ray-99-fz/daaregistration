const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const supabase = require("../lib/supabase");

const webhookSecret = process.env.PAYCHANGU_WEBHOOK_SECRET;

router.post("/", async (req, res) => {
  try {
    console.log("Webhook hit!");
    console.log("Webhook hit from PayChangu");

    const rawBody = req.body;
    const payload = Buffer.isBuffer(rawBody) ? rawBody.toString("utf8") : String(rawBody ?? "");
    console.log("Headers:", req.headers);
    const signature = req.headers["signature"];
    console.log(signature)

    if (!webhookSecret) {
      return res.status(500).send("Webhook not configured");
    }

    if (!signature) {
      console.log("Invalid signature");
      return res.status(400).send("Missing signature");
    }

    const computed = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");


//     const skipSignature = true;

// if (!skipSignature) {
//   if (!signature) {
//     console.log("Missing signature");
//     return res.status(400).send("Missing signature");
//   }

//   const computed = crypto
//     .createHmac("sha256", webhookSecret)
//     .update(payload)
//     .digest("hex");

//   if (computed !== signature) {
//     console.log("Invalid signature");
//     return res.status(403).send("Invalid signature");
//   }
// }
    if (computed !== signature) {
      console.log("Invalid signature");
      return res.status(403).send("Invalid signature");
    }

    // const data = JSON.parse(payload);
    // console.log("Webhook data:", data);

    // const reference = data.reference;
    // const amount = data.amount;
    // const status = data.status;

    // if (status === "success" && reference && amount) {
    //   await supabase.from("registrations").update({ payment_status: "Paid", paid_amount: Number(amount) }).eq("payment_reference", reference);
    // }

const data = JSON.parse(payload);
console.log("Webhook data:", data)

const reference = data.charge_id;
const amount = Number(data.amount);
const status = data.status;

if (status !== "success" || !reference || !amount) return;

// 1. Get current record
const { data: user, error } = await supabase
  .from("registrations")
  .select("paid_amount, registration_fee")
  .eq("payment_reference", reference)
  .single();

console.log(user)

if (error || !user) {
  console.log("User not found");
  return;
}

// 2. Compute new total
const newPaidAmount = (user.paid_amount || 0) + amount;
const totalFee = user.registration_fee || 5000;

// 3. Determine status
let payment_status;

if (newPaidAmount >= totalFee) {
  payment_status = "Paid";
} else if (newPaidAmount > 0) {
  payment_status = "Partially Paid";
} else {
  payment_status = "Unpaid";
}

// 4. Update DB
await supabase
  .from("registrations")
  .update({
    paid_amount: newPaidAmount,
    payment_status
  })
  .eq("payment_reference", reference);

console.log("Payment updated:", {
  newPaidAmount,
  payment_status
});
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Webhook error");
  }
});

module.exports = router;
