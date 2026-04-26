import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BrandLogo } from "../components/BrandLogo";

type Receipt = {
  reference: string;
  name: string;
  email: string;
  course: string;
  paid_amount: number;
  fee: number;
  balance: number;
  status: string;
  created_at: string;
};

const paymentApiBase =
  import.meta.env.VITE_PAYMENT_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export default function PaymentStatus() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [status, setStatus] = useState<
    "loading" | "success" | "failed" | "timeout"
  >("loading");

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("tx_ref");

  // ⏳ Timeout fallback (30s)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "timeout" : prev));
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ref) return;

    const fetchReceipt = async () => {
      try {
        const res = await fetch(`${paymentApiBase}/api/receipt/${ref}`);
        const data = await res.json();

        if (data.status === "Paid") {
          setReceipt(data);
          setStatus("success");
        } else if (data.status === "Failed") {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReceipt();
    const interval = setInterval(fetchReceipt, 3000);

    return () => clearInterval(interval);
  }, [ref]);

  // 🔁 Auto redirect after success (5s)
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a080c] to-slate-950 relative overflow-hidden flex items-center justify-center px-4">

      {/* 🔴 Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[#E31E24]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-rose-900/25"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* 🔄 LOADING */}
      {status === "loading" && (
        <motion.div className="relative z-10 text-center text-white">
          <div className="w-12 h-12 border-2 border-white/20 border-t-[#E31E24] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Processing your payment...</p>
        </motion.div>
      )}

      {/* ⏳ TIMEOUT */}
      {status === "timeout" && (
        <motion.div className="relative z-10 text-center text-yellow-400">
          <h2 className="text-xl font-semibold mb-2">
            Still processing...
          </h2>
          <p className="text-slate-300">
            This is taking longer than expected. Please wait or refresh.
          </p>
        </motion.div>
      )}

      {/* ❌ FAILED */}
      {status === "failed" && (
        <motion.div className="relative z-10 bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-center text-red-400 max-w-md">
          <h2 className="text-xl font-semibold mb-2">
            Payment Failed
          </h2>
          <p className="text-slate-300 mb-4">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-[#E31E24] rounded-lg text-white"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* ✅ SUCCESS ANIMATION */}
      {status === "success" && !receipt && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative z-10 text-center text-white"
        >
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-3xl mb-4 mx-auto">
            ✓
          </div>
          <p className="text-lg">Payment Successful!</p>
          <p className="text-sm text-slate-400 mt-2">
            Preparing your receipt...
          </p>
        </motion.div>
      )}

      {/* 🧾 RECEIPT */}
      {status === "success" && receipt && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 text-white">
            <div className="flex justify-center mb-4">
              <BrandLogo className="max-h-20 object-contain" />
            </div>

            <h1 className="text-xl font-semibold text-center mb-1">
              Payment Receipt
            </h1>
            <p className="text-center text-sm text-slate-400 mb-6">
              Digital Art Academy
            </p>

            <div className="space-y-2 text-sm text-slate-300">
              <p><span className="text-slate-400">Reference:</span> {receipt.reference}</p>
              <p><span className="text-slate-400">Name:</span> {receipt.name}</p>
              <p><span className="text-slate-400">Email:</span> {receipt.email}</p>
              <p><span className="text-slate-400">Course:</span> {receipt.course}</p>
            </div>

            <div className="border-t border-white/10 my-4" />

            <div className="space-y-2 text-sm">
              <p><span className="text-slate-400">Amount Paid:</span> MWK {receipt.paid_amount}</p>
              <p><span className="text-slate-400">Total Fee:</span> MWK {receipt.fee}</p>
              <p><span className="text-slate-400">Balance:</span> MWK {receipt.balance}</p>
              <p><span className="text-slate-400">Status:</span>{" "}
                <span className="text-green-400">{receipt.status}</span>
              </p>
            </div>

            <div className="mt-6 flex gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-[#E31E24] text-white"
              >
                Print
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 py-2 rounded-xl bg-white/10 text-white"
              >
                Home
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              Redirecting to home...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}