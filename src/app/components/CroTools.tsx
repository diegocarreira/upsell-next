"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const CroTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const selectVariant = (variant: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("variant", variant.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-4 mb-4 border border-gray-200 w-48"
          >
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              CRO Variants
            </h3>
            <ul className="space-y-2">
              <div className="border-t border-gray-200 my-2 font-bold">
                Hypothesis 1
              </div>

              <li>
                <button
                  onClick={() => selectVariant(1)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 1 - Variant A
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectVariant(2)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 1 - Variant B
                </button>
              </li>

              <div className="border-t border-gray-200 my-2 font-bold">
                Hypothesis 2
              </div>

              <li>
                <button
                  onClick={() => selectVariant(3)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 2 - Variant A
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectVariant(4)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 2 - Variant B
                </button>
              </li>

              <div className="border-t border-gray-200 my-2 font-bold">
                Hypothesis 3
              </div>

              <li>
                <button
                  onClick={() => selectVariant(5)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 3 - Variant A
                </button>
              </li>
              <li>
                <button
                  onClick={() => selectVariant(6)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 text-sm transition-colors"
                >
                  Hypothesis 3 - Variant B
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePanel}
        className="bg-black hover:bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </motion.button>
    </div>
  );
};
