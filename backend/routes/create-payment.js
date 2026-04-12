const express = require("express");
const router = express.Router();
const supabase = require("../lib/supabase");
const generateReference = require("../utils/generateReference");

router.post("/", async (req, res) => {
  try {
    const data = req.body ?? {};
    const payment_reference = generateReference();

    const { payment_reference: _ignoreRef, payment_status: _ignoreStatus, ...rest } = data;

    const payload = {
      ...rest,
      payment_reference,
      payment_status: "Pending",
    };

    const { error } = await supabase.from("registrations").insert([payload]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const paymentUrl = `https://pay.paychangu.com/SC-wiM0rC?reference=${payment_reference}`;

    res.json({ paymentUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to create payment" });
  }
});

module.exports = router;
