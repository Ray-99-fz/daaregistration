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
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("tx_ref");

  useEffect(() => {
    if (!ref) return;

    const fetchReceipt = async () => {
      try {
        const res = await fetch(`${paymentApiBase}/api/receipt/${ref}`);
        const data = await res.json();

        if (data.status !== "Pending") {
          setReceipt(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReceipt();
    const interval = setInterval(fetchReceipt, 3000);

    return () => clearInterval(interval);
  }, [ref]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#1a080c] to-slate-950 relative overflow-hidden flex items-center justify-center px-4">
      
      {/* 🔴 Background glow (same as landing) */}
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

      {/* 🔄 Loading State */}
      {(loading || !receipt) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-white"
        >
          <div className="w-12 h-12 border-2 border-white/20 border-t-[#E31E24] rounded-full animate-spin mb-4" />
          <p className="text-lg text-slate-300">Processing your payment...</p>
        </motion.div>
      )}

      {/* 🧾 Receipt */}
      {!loading && receipt && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 text-white">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <BrandLogo className="max-h-20 object-contain" />
            </div>

            <h1 className="text-xl font-semibold text-center mb-1">
              Payment Receipt
            </h1>
            <p className="text-center text-sm text-slate-400 mb-6">
              Digital Art Academy
            </p>

            {/* Details */}
            <div className="space-y-2 text-sm text-slate-300">
              <p><span className="text-slate-400">Reference:</span> {receipt.reference}</p>
              <p><span className="text-slate-400">Name:</span> {receipt.name}</p>
              <p><span className="text-slate-400">Email:</span> {receipt.email}</p>
              <p><span className="text-slate-400">Course:</span> {receipt.course}</p>
            </div>

            <div className="border-t border-white/10 my-4" />

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-400">Amount Paid:</span>{" "}
                <span className="text-white font-medium">
                  MWK {receipt.paid_amount}
                </span>
              </p>
              <p>
                <span className="text-slate-400">Total Fee:</span>{" "}
                MWK {receipt.fee}
              </p>
              <p>
                <span className="text-slate-400">Balance:</span>{" "}
                MWK {receipt.balance}
              </p>
              <p>
                <span className="text-slate-400">Status:</span>{" "}
                <span className="text-green-400 font-semibold">
                  {receipt.status}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-[#E31E24] hover:bg-red-600 transition text-white font-medium"
              >
                Print
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white font-medium"
              >
                Home
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}