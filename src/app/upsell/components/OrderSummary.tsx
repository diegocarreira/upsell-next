import { OrderTotals } from "@/types/OrderTotals";

/* eslint-disable react/no-unescaped-entities */
export const OrderSummary = ({ totals }: { totals: OrderTotals }) => {
  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-6 bg-gray-50">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Items:</span>
          <span className="text-gray-800 font-medium ">{totals.quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Standard Price:</span>
          <span className="text-gray-800 font-medium line-through">
            ${totals.originalTotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Total Savings:</span>
          <span className="text-green-600 font-medium">-${totals.savings}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Today's Price:</span>
          <div className="flex items-center">
            <span className="mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              90% OFF
            </span>
            <span className="text-gray-800 font-bold">
              ${totals.discountedTotal}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping & Handling:</span>
          <span className="text-gray-800 font-medium">
            ${totals.shippingHandlingTotal}
          </span>
        </div>

        <div className="border-t border-gray-300 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-800 font-bold">Total:</span>
            <span className="text-gray-800 font-bold text-xl">
              ${totals.finalTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
