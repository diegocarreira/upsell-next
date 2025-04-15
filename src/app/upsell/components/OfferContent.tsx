import { Countdown } from "@/components/Countdown";
import { OrderTotals } from "@/types/OrderTotals";
import { UpsellData } from "@/types/UpsellData";
import Link from "next/link";
import { OrderSummary } from "./OrderSummary";
import { ProductList } from "./ProductList";

export const OfferContent = ({
  data,
  selectedProducts,
  totals,
  toggleProductSelection,
  handleAddToCart,
}: {
  data: UpsellData;
  selectedProducts: number[];
  totals: OrderTotals;
  toggleProductSelection: (productId: number) => void;
  handleAddToCart: () => void;
}) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 mt-8 text-center">
        {data.copy}
      </h2>
      <p className="text-center text-gray-600 mb-4">{data.subcopy}</p>
      <Countdown />
      <div className="space-y-8">
        {/* Products Grid */}
        <ProductList
          products={data.products}
          selectedProducts={selectedProducts}
          toggleProductSelection={toggleProductSelection}
        />

        {/* Order Summary */}
        {selectedProducts.length > 0 && <OrderSummary totals={totals} />}

        {/* Call to Action */}
        <div className="space-y-4 mt-8">
          <button
            onClick={() => {
              handleAddToCart();
            }}
            className={`w-full py-4 mb-4 ${
              selectedProducts.length > 0
                ? "bg-blue-500 hover:bg-blue-600 min-h-[90px]"
                : "bg-gray-400"
            } text-white font-bold rounded-lg transition duration-200 text-lg shadow-md cursor-pointer`}
            disabled={selectedProducts.length === 0}
          >
            {selectedProducts.length > 0
              ? `${data.primaryCTA}`
              : "Select at least one product to continue"}
          </button>
          <Link href="/thankyou">
            <button className="w-full py-4 bg-white border border-gray-200 hover:bg-gray-300 text-gray-500 font-bold rounded-lg transition duration-200 text-lg shadow-md cursor-pointer">
              {data.secondaryCTA}
            </button>
          </Link>
        </div>

        {/* Guarantee */}
        <div className="text-center text-gray-500 text-sm">
          {data.guarantee}
        </div>
      </div>
    </>
  );
};
