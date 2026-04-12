const express = require("express");
const cors = require("cors");
require("dotenv").config();

const createPaymentRoute = require("./routes/create-payment");
const webhookRoute = require("./routes/webhook");

const app = express();

const frontendOrigins = [
    "http://localhost:5173",   // default Vite port
    "http://localhost:5174",   // your actual dev port
    process.env.FRONTEND_URL   // production frontend domain
  ].filter(Boolean);

app.use(
  cors({
    origin: frontendOrigins,
  })
);

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoute);

app.use(express.json());
app.use("/create-payment", createPaymentRoute);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
