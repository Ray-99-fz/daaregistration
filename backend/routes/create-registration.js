import express from "express";
import supabase from "../lib/supabase.js";
import generateReference from "../utils/generateReference.js";

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL;

router.post("/", async (req, res) => {
  try {
    console.log("registration endpoint hit!");

    const data = req.body ?? {};
    const payment_reference = generateReference();

    const {
      payment_reference: _ignoreRef,
      reg_status: _ignoreStatus,
      paid_amount: _ignoreAmount,
      ...rest
    } = data;

    // ✅ Force required DB fields
    const payload = {
      ...rest,

      // REQUIRED DB FIELDS
      registration_fee: 0,
      course_fee: 50000, // adjust if dynamic later

      // SYSTEM FIELDS
      payment_reference,
      reg_status: "Registered",
      paid_amount: 0,
    };

    console.log("INSERT PAYLOAD:", payload);

    const { error } = await supabase
      .from("newregistrations")
      .insert([payload]);

    if (error) {
      console.error("DB error:", error);

      return res.status(500).json({
        error: error.message,
        redirectUrl: `${FRONTEND_URL}/registration-failed?reason=db`,
      });
    }

    return res.json({
      success: true,
      redirectUrl: `${FRONTEND_URL}/registration-success?ref=${payment_reference}`,
    });

  } catch (err) {
    console.error("Server error:", err);

    return res.status(500).json({
      error: "Server error",
      redirectUrl: `${FRONTEND_URL}/registration-failed?reason=server`,
    });
  }
});

export default router;





// import express from "express";
// import supabase from "../lib/supabase.js";
// import generateReference from "../utils/generateReference.js";

// const router = express.Router();

// const FRONTEND_URL = process.env.FRONTEND_URL;

// router.post("/", async (req, res) => {
//   try {
//     console.log("registration endpoint hit!");

//     const data = req.body ?? {};
//     const payment_reference = generateReference();

//     const {
//       payment_reference: _ignoreRef,
//       reg_status: _ignoreStatus,
//       paid_amount: _ignoreAmount,
//       ...rest
//     } = data;

//     const payload = {
//       ...rest,
//       payment_reference,
//       reg_status: "Registered", // ✅ better than "Completed"
//       paid_amount: 0,
//     };

//     const { error } = await supabase
//       .from("newregistrations")
//       .insert([payload]);

//     // if (error) {
//     //   console.error("DB error:", error.message);

//     //   return res.status(500).json({
//     //     error: "Failed to create registration",
//     //     // redirectUrl: `${FRONTEND_URL}/registration-failed?reason=db`,
//     //   });
//     // }

//     if (error) {
//       console.error("DB error FULL:", error);

//       return res.status(500).json({
//         error: error.message,
//         details: error.details,
//         hint: error.hint,
//       });
//     }

//     return res.json({
//       success: true,
//       // redirectUrl: `${FRONTEND_URL}/registration-success?ref=${payment_reference}`,
//     });

//   } catch (err) {
//     console.error("Server error:", err);

//     return res.status(500).json({
//       error: "Server error",

//       // console.log("DB error FULL:", err);
            
//       error: err.message,
//         details: err.details,
//         hint: err.hint,
      
//       // redirectUrl: `${FRONTEND_URL}/registration-failed?reason=server`,
//     });
//   }
// });

// export default router;




















// import express from "express";
// import supabase from "../lib/supabase.js";
// import generateReference from "../utils/generateReference.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     console.log("payment creation endpoint hit!");

//     const data = req.body ?? {};
//     const payment_reference = generateReference();

//     const {
//       payment_reference: _ignoreRef,
//       payment_status: _ignoreStatus,
//       paid_amount: _ignoreAmount,
//       ...rest
//     } = data;

//     const payload = {
//       ...rest,
//       payment_reference,
//       payment_status: "Pending",
//       paid_amount: 0,
//     };

//     const { error } = await supabase
//       .from("registrations")
//       .insert([payload]);

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     // const response = await fetch("https://api.paychangu.com/payment", {
//     //   method: "POST",
//     //   headers: {
//     //     Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     amount: payload.registration_fee || 5000,
//     //     // amount: 100,
//     //     currency: "MWK",
//     //     email: payload.email,
//     //     first_name: payload.first_name,
//     //     last_name: payload.last_name,
//     //     // callback_url: "https://daaregistration.onrender.com/webhook",
//     //     callback_url: `https://daaregistration.vercel.app/payment-status?ref=${payment_reference}`,
//     //     return_url: "https://daaregistration.onrender.com/webhook",
//     //     // return_url: `https://daaregistration.vercel.app/payment-status?ref=${payment_reference}`,
//     //     tx_ref: payment_reference,
//     //   }),
//     // });

//     // const result = await response.json();
//     // console.log("PayChangu response:", result);

//     // const paymentUrl = result?.data?.checkout_url;

//     // if (!paymentUrl) {
//     //   return res.status(500).json({ error: "Failed to get payment link" });
//     // }

//     // res.json({ paymentUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create payment" });
//   }
// });

// export default router;






































// // const express = require("express");
// // const router = express.Router();
// // const supabase = require("../lib/supabase");
// // const generateReference = require("../utils/generateReference");
// // const fetch = require("node-fetch");

// // router.post("/", async (req, res) => {
// //   try {
// //     console.log("payment creation endpoint hit!");

// //     const data = req.body ?? {};
// //     const payment_reference = generateReference();

// //     const {
// //       payment_reference: _ignoreRef,
// //       payment_status: _ignoreStatus,
// //       paid_amount: _ignoreAmount,
// //       ...rest
// //     } = data;

// //     const payload = {
// //       ...rest,
// //       payment_reference,
// //       payment_status: "Pending",
// //       paid_amount: 0,
// //     };

// //     const { error } = await supabase
// //       .from("registrations")
// //       .insert([payload]);

// //     if (error) {
// //       return res.status(500).json({ error: error.message });
// //     }

// //     // 🔥 CALL PAYCHANGU API
// //     const response = await fetch("https://api.paychangu.com/payment", {
// //       method: "POST",
// //       headers: {
// //         Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         amount: payload.registration_fee || 5000, // adjust as needed
// //         currency: "MWK",
// //         email: payload.email,
// //         first_name: payload.first_name,
// //         last_name: payload.last_name,
// //         callback_url: "https://daaregistration.onrender.com/webhook",
// //         return_url: "/payment-status",

// //         // 🔥 THIS IS THE KEY
// //         tx_ref: payment_reference,
// //       }),
// //     });

// //     const result = await response.json();

// //     const paymentUrl = result?.data?.checkout_url;

// //     if (!paymentUrl) {
// //       console.error(result);
// //       return res.status(500).json({ error: "Failed to get payment link" });
// //     }

// //     res.json({ paymentUrl });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Failed to create payment" });
// //   }
// // });

// // module.exports = router;






















// // // 
