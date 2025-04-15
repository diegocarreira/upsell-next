"use client";

import { useState, useEffect, useMemo } from "react";
import { LuckyCards } from "../components/LuckyCards";
import { CroTools } from "../components/CroTools";
import { UpsellData } from "@/types/UpsellData";
import { Product } from "@/types/Product";
import { OrderTotals } from "@/types/OrderTotals";
import { PreHeader } from "./components/PreHeader";
import { useRouter, useSearchParams } from "next/navigation";
import { OfferContent } from "./components/OfferContent";

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
      quantity: selected.length,
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

        <div className="container mx-auto w-full sm:py-8 md:py-8 lg:py-8 xl:py-8 lucky-cards-container">
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
