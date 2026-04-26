import express from "express";
import supabase from "../lib/supabase.js";

const router = express.Router();

// GET /api/receipt/:ref
router.get("/:ref", async (req, res) => {
  try {
    const { ref } = req.params;

    // 1. Validate input
    if (!ref) {
      return res.status(400).json({ error: "Missing reference" });
    }

    // 2. Fetch registration record
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("payment_reference", ref)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    // 3. Compute derived values
    const balance =
      (data.registration_fee || 0) - (data.paid_amount || 0);

    // 4. Return clean response (VERY IMPORTANT)
    return res.json({
      reference: data.payment_reference,
      name: data.first_name + " " + data.last_name,
      email: data.email,
      course: data.course_id,
      paid_amount: data.paid_amount,
      fee: data.registration_fee,
      balance,
      status: data.payment_status,
      created_at: data.created_at,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;