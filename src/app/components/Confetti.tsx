import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
};

interface ConfettiProps {
  duration?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ duration = 3000 }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Generate random confetti pieces
    const colors = [
      "#FFC700",
      "#FF0000",
      "#2E7DF7",
      "#37E237",
      "#F649A7",
      "#8A2BE2",
    ];
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // random position across screen width (%)
        y: -5 - Math.random() * 10, // start above the viewport
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3, // stagger the animation start
      });
    }

    setPieces(newPieces);

    // Hide confetti after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: `${piece.y}vh`,
            rotate: piece.rotation,
            scale: piece.scale,
            opacity: 1,
          }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + Math.random() * 360,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: piece.delay,
            ease: [0.1, 0.25, 0.3, 1],
          }}
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            boxShadow: `0 0 5px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
};
