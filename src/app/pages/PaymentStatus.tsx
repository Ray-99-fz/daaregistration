import { useEffect, useState } from "react";
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

const paymentApiBase = import.meta.env.VITE_PAYMENT_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";


export default function PaymentStatus() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  // get ref from URL
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

    // initial call
    fetchReceipt();

    // polling every 3s
    const interval = setInterval(fetchReceipt, 3000);

    return () => clearInterval(interval);
  }, [ref]);

  // 🔄 Loading / Processing state
  if (loading || !receipt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
        <p className="text-lg font-medium">Processing payment...</p>
      </div>
    );
  }

  // 🧾 Receipt UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 print:bg-white">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 print:shadow-none print:border">

        <h1 className="text-2xl font-bold text-center mb-2">
          Digital Art Academy
        </h1>
        <div className="flex justify-center mb-6 px-2">
            <BrandLogo className="w-full max-w-[min(100%,32rem)] h-auto max-h-24 sm:max-h-32 md:max-h-36 object-contain mx-auto" />
        </div>
        <p className="text-center text-sm mb-4">Payment Receipt</p>

        <div className="text-sm space-y-1">
          <p><strong>Reference:</strong> {receipt.reference}</p>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Course:</strong> {receipt.course}</p>
        </div>

        <hr className="my-4" />

        <div className="text-sm space-y-1">
          <p><strong>Amount Paid:</strong> MWK {receipt.paid_amount}</p>
          <p><strong>Total Fee:</strong> MWK {receipt.fee}</p>
          <p><strong>Balance:</strong> MWK {receipt.balance}</p>
          <p><strong>Status:</strong> {receipt.status}</p>
        </div>

        <div className="mt-6 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}