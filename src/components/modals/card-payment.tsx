"use client";
import React, { useState } from "react";
import { CreditCard, Lock, X } from "lucide-react";
import BaseModal from "./base-modal";

// Combined Payment Modal Content with Tabs
const PaymentMethodContent = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [paypalId, setPaypalId] = useState("");
  const [saveAccount, setSaveAccount] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <BaseModal isOpen={true} onClose={onClose} showOnMobile={true}>
      <div className="relative p-6 sm:p-8">
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-2">
          Add Payment Method
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please enter your details.
        </p>

        {/* Toggle Buttons */}
        <div className="flex gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTab("card")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
              activeTab === "card"
                ? "bg-[#FF6B6B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <CreditCard size={18} />
            Card
          </button>
          <button
            onClick={() => setActiveTab("paypal")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
              activeTab === "paypal"
                ? "bg-[#FF6B6B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.794.679H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
              <path d="M2.379 6.667l.232-1.474A.768.768 0 013.364 4.5h8.243c1.656 0 2.895.338 3.68 1.005.4.34.687.745.877 1.236a5.6 5.6 0 01.315 1.942c-.728 4.636-3.844 6.297-7.77 6.297h-1.94a.97.97 0 00-.957.82l-1.024 6.486a.582.582 0 01-.575.491H2.068a.387.387 0 01-.382-.452l2.693-17.158z" />
            </svg>
            Paypal
          </button>
        </div>

        {/* Card Tab Content */}
        {activeTab === "card" && (
          <>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">
                Card Information
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., 0897 9078 6779 0957"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value.slice(0, 19)))
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5">
                  <div className="w-8 h-5 bg-gradient-to-br from-red-500 to-orange-400 rounded opacity-80"></div>
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold">
                    visa
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-900 font-medium mb-3">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(formatExpiryDate(e.target.value.slice(0, 5)))
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-3">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="e.g.,756"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <span className="text-sm text-gray-700">
                  Save card for future bookings
                </span>
              </label>
            </div>
          </>
        )}

        {/* PayPal Tab Content */}
        {activeTab === "paypal" && (
          <>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">
                PayPal ID
              </label>
              <input
                type="text"
                placeholder="e.g., johndoe@gmail.com"
                value={paypalId}
                onChange={(e) => setPaypalId(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveAccount}
                  onChange={(e) => setSaveAccount(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <span className="text-sm text-gray-700">
                  Save account for future bookings
                </span>
              </label>
            </div>
          </>
        )}

        <div className="flex items-start gap-2 mb-8 text-gray-500 text-xs">
          <Lock size={14} className="mt-0.5 shrink-0" />
          <p>
            Securely encrypted. Your information is safe with us. We use
            industry-standard SSL encryption to protect your data.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button className="flex-1 px-6 py-3.5 bg-[#FF6B6B] text-white rounded-xl font-medium hover:bg-[#FF5252] transition-colors">
            Add Payment Method
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default PaymentMethodContent;
