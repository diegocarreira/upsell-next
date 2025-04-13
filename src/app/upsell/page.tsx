"use client";

import { useState, useEffect, useMemo } from "react";
import { Countdown } from "../components/Countdown";
import { LuckyCards } from "../components/LuckyCards";
import { CroTools } from "../components/CroTools";
import { UpsellData } from "@/types/UpsellData";
import { Product } from "@/types/Product";
import { ProductList } from "./components/ProductList";
import { OrderSummary } from "./components/OrderSummary";
import { OrderTotals } from "@/types/OrderTotals";
import { PreHeader } from "./components/PreHeader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpsellPage() {
  const [data, setData] = useState<UpsellData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const revealed = searchParams.get("revealed");
  const variant = searchParams.get("variant");
  const isRevealed = revealed === "true";

  const fetchData = async () => {
    let endpointUrl = "/api/upsell-data";

    // Add CRO variant parameter if it exists
    if (variant) {
      endpointUrl = endpointUrl + `?variant=${variant}`;
    }

    fetch(endpointUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching upsell data:", err);
        setError("Failed to load offer");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  const router = useRouter();

  const getSelectedProducts = (): Product[] => {
    if (!data) return [];
    return data.products.filter((product) =>
      selectedProducts.includes(product.id)
    );
  };

  const totals: OrderTotals = useMemo(() => {
    const selected = getSelectedProducts();
    const originalTotal = selected.reduce(
      (sum, product) => sum + product.originalPrice,
      0
    );
    const discountedTotal = selected.reduce(
      (sum, product) => sum + product.discountedPrice,
      0
    );
    const shippingHandlingTotal = selected.reduce(
      (sum, product) => sum + product.shippingHandling,
      0
    );
    const savings = originalTotal - discountedTotal;

    return {
      originalTotal: originalTotal.toFixed(2),
      discountedTotal: discountedTotal.toFixed(2),
      shippingHandlingTotal: shippingHandlingTotal.toFixed(2),
      savings: savings.toFixed(2),
      finalTotal: (
        discountedTotal + (selected.length > 0 ? shippingHandlingTotal : 0)
      ).toFixed(2),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, data?.products]);

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = () => {
    const selected = getSelectedProducts();
    if (selected.length > 0) {
      // add to cart action
      localStorage.setItem(
        "order",
        JSON.stringify({
          id: Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString(),
          products: selected,
          totals,
        })
      );

      // redirect to thankyou page
      router.push("/thankyou");
    } else {
      console.error("No products selected");
    }
  };

  if (loading) {
    return <div className="text-center p-8 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <PreHeader />
      <CroTools />

      <div className="max-w-2xl mx-auto px-4 py-8 pb-24 font-sans page-container">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {data.title}
          </h1>
          <p className="text-lg text-gray-600">{data.subtitle}</p>
        </header>

        <div className="container mx-auto w-full lucky-cards-container">
          <LuckyCards />
        </div>

        {isRevealed && (
          <OfferContent
            data={data}
            selectedProducts={selectedProducts}
            toggleProductSelection={toggleProductSelection}
            totals={totals}
            handleAddToCart={handleAddToCart}
          />
        )}
      </div>
    </>
  );
}

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
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400"
            } text-white font-bold rounded-lg transition duration-200 text-lg shadow-md cursor-pointer`}
            disabled={selectedProducts.length === 0}
          >
            {selectedProducts.length > 0
              ? `${data.primaryCTA} (${selectedProducts.length} item${
                  selectedProducts.length > 1 ? "s" : ""
                })`
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
