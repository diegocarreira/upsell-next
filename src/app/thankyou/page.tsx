/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Confetti } from "../components/Confetti";
import Link from "next/link";
import { Order } from "@/types/Order";

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // grab order from locastorage
    const order = localStorage.getItem("order");
    if (order) {
      const parsedData = JSON.parse(order);
      setOrderData(parsedData);
    } else {
      console.error("No order found!");
    }
  }, []);

  return (
    <>
      {showConfetti && <Confetti duration={5000} />}

      <div className="max-w-2xl mx-auto px-4 py-8 font-sans page-container">
        <header className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              🎉 Thank You For Your Order! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Your items are on their way!
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center"
        >
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Order Successfully Placed
          </h2>
          <p className="text-gray-600">
            We've sent a confirmation email with all the details to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#ORD-{orderData?.id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{orderData?.date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-800 font-bold">Total:</span>
              <span className="font-bold text-blue-600">
                ${orderData?.totals?.finalTotal}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              What's Next?
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  Your order is being processed and will ship within 1-2
                  business days.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  You'll receive tracking information via email once your
                  package ships.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  If you have any questions, please contact our customer support
                  team.
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200 shadow-md"
            >
              Return to Homepage
            </Link>
          </div>

          <div className="text-center text-gray-500 text-sm mt-8">
            30-day money-back guarantee on all products
          </div>
        </motion.div>
      </div>
    </>
  );
}
