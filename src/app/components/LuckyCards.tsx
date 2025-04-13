import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Confetti } from "./Confetti";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const cards = [
  { id: 1, initialRotation: "-20deg" },
  { id: 2, initialRotation: 0 },
  { id: 3, initialRotation: "20deg" },
];

export const LuckyCards = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const revealed = searchParams.get("revealed");
  const isRevealedFromURL = revealed === "true";

  const [selectedCard, setSelectedCard] = useState<number | null>(
    isRevealedFromURL ? 2 : null
  );
  const [isRevealed, setIsRevealed] = useState(isRevealedFromURL);
  const [showConfetti, setShowConfetti] = useState(isRevealedFromURL);

  useEffect(() => {
    // If page loads with revealed=true, show confetti and hide after 3 seconds
    if (isRevealedFromURL && showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [isRevealedFromURL, showConfetti]);

  const handleCardClick = (cardId: number) => {
    if (!isRevealed) {
      setSelectedCard(cardId);
      setIsRevealed(true);
      setShowConfetti(true);

      // Add revealed=true to URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("revealed", "true");
      router.push(`${pathname}?${newSearchParams.toString()}`);

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[200px] p-4 w-full">
      {showConfetti && <Confetti />}
      {/* <div className="flex gap-2 sm:gap-4 md:gap-8 w-full justify-center"> */}
      <div className="flex w-full justify-center">
        {cards.map((card) => {
          const isSelected = selectedCard === card.id;
          const isNotSelected = isRevealed && !isSelected;

          return (
            <motion.div
              key={card.id}
              initial={{
                rotate: card.initialRotation,
                scale: 1,
              }}
              animate={{
                rotate: isRevealed ? 0 : card.initialRotation,
                scale: isSelected ? 1.5 : 1,
                filter: isNotSelected ? "grayscale(100%)" : "grayscale(0%)",
              }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCardClick(card.id)}
              className={`relative cursor-pointer ${
                !isRevealed ? "ml-[-10px]" : "ml-[10px]"
              } ${isSelected ? "z-20" : card.id === 2 ? "z-10" : "z-0"} `}
              style={{ perspective: "500px" }}
            >
              <motion.div
                initial={false}
                animate={{
                  rotateY: isRevealed ? 180 : 0,
                }}
                transition={{ duration: 0.6, type: "tween" }}
                className="relative w-[100px] h-[140px] xs:w-[80px] xs:h-[120px] sm:w-[120px] sm:h-[170px] md:w-[140px] md:h-[200px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Back */}
                <div
                  className={`absolute w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl flex items-center justify-center
                    ${isRevealed ? "pointer-events-none" : ""}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                    ?
                  </span>
                </div>

                {/* Card Front */}
                <div
                  className="absolute w-full h-full rounded-xl bg-white shadow-xl p-6 flex flex-col items-center justify-center text-center border border-gray-100"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {isSelected ? (
                    <>
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2 md:mb-4 z-10">
                        90%
                      </span>
                      <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">
                        <span className="text-gray-800 font-bold">
                          Discount
                        </span>{" "}
                        <span className="text-gray-600">
                          on our top seller products! 🎉
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-500 mb-2 md:mb-4">
                        {card.id === 1 ? "50%" : card.id === 2 ? "30%" : "20%"}
                      </span>
                      <p className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">
                        Discount
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
