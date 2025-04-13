import { UpsellData } from "@/types/UpsellData";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const control: UpsellData = {
  title: "🎁 Pick a Mystery Card to Reveal Your Special Gift!",
  subtitle:
    "Choose wisely... a special surprise is hiding behind one of these cards 🤞",
  copy: "🎉 CONGRATULATIONS! You've Unlocked an Exclusive 90% OFF Deal!",
  subcopy:
    "🔥 This is your ONE-TIME chance to grab our best-selling products at an unbelievable 90% discount! Choose up to 4 items below to add to your order and save hundreds. But hurry, this special winner's offer expires when you leave this page, and you'll never see these prices again! 🔥",
  products: [
    {
      id: 1,
      name: "Silver heart pendant necklace",
      description: "A timeless piece of elegance",
      originalPrice: 59.99,
      discountedPrice: 5.99,
      savings: 54,
      shippingHandling: 2.99,
      imageUrl: "https://interate.com.br/shared-images/white-necklace.jpg",
      bestSeller: true,
    },
    {
      id: 2,
      name: "Luxury queen's perfume",
      description: "A fragrance fit for royalty",
      originalPrice: 49.99,
      discountedPrice: 4.99,
      savings: 45,
      shippingHandling: 4.99,
      imageUrl:
        "https://interate.com.br/shared-images/luxury-queens-perfume.jpg",
    },
    {
      id: 3,
      name: "Anti-age skin-care kit",
      description: "The ultimate skin-care solution",
      originalPrice: 29.99,
      discountedPrice: 2.99,
      shippingHandling: 27.99,
      savings: 5,
      imageUrl: "https://interate.com.br/shared-images/skin-care-kit.jpg",
    },
    {
      id: 4,
      name: "Premium golden Watch",
      description: "With brilliant round-cut stones",
      originalPrice: 79.99,
      discountedPrice: 7.99,
      shippingHandling: 4.0,
      savings: 72,
      imageUrl:
        "https://interate.com.br/shared-images/premium-golden-watch.jpg",
    },
  ],
  guarantee: "30-day money-back guarantee on all products",
  primaryCTA: "Add to Cart & Claim Discount Offer",
  secondaryCTA: "Decline Offer",
};

const variants: UpsellData[] = [
  control, // variant 1
  {
    ...control,
    title: "🎁 Ready to Play? Your Mystery Discount is Just One Click Away!",
    subtitle:
      "Three cards, one amazing reward. Make your choice and discover your exclusive shopping bonus!",
  }, // variant 2
  control, // variant 3
  {
    ...control,
    products: [
      {
        id: 1,
        name: "Silver heart pendant necklace",
        description: "A timeless piece of elegance",
        originalPrice: 59.99,
        discountedPrice: 5.99,
        savings: 54,
        shippingHandling: 2.99,
        sellsNumber: "2,347",
        imageUrl: "https://interate.com.br/shared-images/white-necklace.jpg",
        bestSeller: true,
      },
      {
        id: 2,
        name: "Luxury queen's perfume",
        description: "A fragrance fit for royalty",
        originalPrice: 49.99,
        discountedPrice: 4.99,
        savings: 45,
        shippingHandling: 4.99,
        sellsNumber: "1,901",
        imageUrl:
          "https://interate.com.br/shared-images/luxury-queens-perfume.jpg",
      },
      {
        id: 3,
        name: "Anti-age skin-care kit",
        description: "The ultimate skin-care solution",
        originalPrice: 29.99,
        discountedPrice: 2.99,
        shippingHandling: 27.99,
        sellsNumber: "3,027",
        savings: 5,
        imageUrl: "https://interate.com.br/shared-images/skin-care-kit.jpg",
      },
      {
        id: 4,
        name: "Premium golden Watch",
        description: "With brilliant round-cut stones",
        originalPrice: 79.99,
        discountedPrice: 7.99,
        shippingHandling: 4.0,
        savings: 72,
        sellsNumber: "579",
        imageUrl:
          "https://interate.com.br/shared-images/premium-golden-watch.jpg",
      },
    ],
  }, // variant 4
  control, // variant 5
  {
    ...control,
    secondaryCTA: "No Thanks, I'll Miss This one-time exclusive Offer",
  }, // variant 6
];

export async function GET(
  request: NextRequest
): Promise<NextResponse<UpsellData>> {
  // Get query parameters from the URL
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");

  // Return the upsell data based on variant
  const upsellData: UpsellData = variant
    ? parseInt(variant) > 0
      ? variants[parseInt(variant) - 1]
      : control
    : control;

  return NextResponse.json(upsellData);
}
