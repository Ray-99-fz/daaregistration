import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import createPaymentRoute from "./routes/create-payment.js";
import webhookRoute from "./routes/webhook.js";
import emailRoutes from "./routes/emailRoutes.js";
import receiptRoutes from "./routes/receipt.js";

dotenv.config();

const app = express();

const frontendOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: frontendOrigins,
  })
);

// ✅ IMPORTANT: keep raw BEFORE json
app.use("/webhook", express.raw({ type: "*/*" }), webhookRoute);

app.use(express.json());
app.use("/create-payment", createPaymentRoute);
app.use("/api/email", emailRoutes);
app.use("/api/receipt", receiptRoutes);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});































// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const createPaymentRoute = require("./routes/create-payment");
// const webhookRoute = require("./routes/webhook");

// const app = express();

// const frontendOrigins = [
//     "http://localhost:5173",   // default Vite port
//     "http://localhost:5174",   // your actual dev port
//     process.env.FRONTEND_URL   // production frontend domain
//   ].filter(Boolean);

// app.use(
//   cors({
//     origin: frontendOrigins,
//   })
// );

// app.use("/webhook", express.raw({ type: "application/json" }), webhookRoute);
// // app.use("/webhook", express.raw({ type: "*/*" }), webhookRoute);

// app.use(express.json());
// app.use("/create-payment", createPaymentRoute);

// const port = Number(process.env.PORT) || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
