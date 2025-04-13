"use client";
import { Product } from "@/types/Product";

export interface ProductListType {
  products: Product[];
  selectedProducts: number[];
  toggleProductSelection: (productId: number) => void;
}
export const ProductList = ({
  products,
  selectedProducts,
  toggleProductSelection,
}: ProductListType) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => {
        const isSelected = selectedProducts.includes(product.id);

        return (
          <div
            key={product.id}
            onClick={() => toggleProductSelection(product.id)}
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer relative
                    ${
                      isSelected
                        ? "border-green-500 border-2 bg-green-50"
                        : "border-slate-200"
                    }`}
          >
            {product.bestSeller && (
              <div className="bg-purple-300 text-black font-bold text-xs uppercase tracking-wider py-1 px-2 rounded-xl self-start mb-2">
                Best Seller
              </div>
            )}

            {/* Selected Indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {/* Product Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-80 object-cover object-bottom rounded-lg mb-4"
            />

            {/* Product Info */}
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>

            {/* Pricing */}
            <div className="flex items-center mb-3">
              <span className="text-[1rem] text-red-500 font-bold line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-gray-800">
                ${product.discountedPrice.toFixed(2)}
                <span className="text-gray-500 font-normal text-xs block">
                  S&H ${product.shippingHandling.toFixed(2)}
                </span>
              </span>
              <span className="ml-4 text-green-600 text-sm">
                Save ${product.savings.toFixed(2)}
              </span>
            </div>

            {/* Social proof */}
            {product.sellsNumber && (
              <p className="text-sm text-gray-800 mb-3">
                {product.sellsNumber} customers chose this offer
              </p>
            )}

            {/* Selection Status */}
            <div
              className={`w-full py-2 ${
                isSelected ? "bg-green-500" : "bg-gray-200"
              } text-white font-bold rounded-lg transition duration-200 text-sm shadow-md mt-auto text-center`}
            >
              {isSelected ? "Selected" : "Click to Select"}
            </div>
          </div>
        );
      })}
    </div>
  );
};
