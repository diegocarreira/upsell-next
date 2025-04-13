import { useState, useEffect } from "react";

export const Countdown = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 29,
    seconds: 0,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        // Stop the countdown when it reaches 00:00:00
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(countdown);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(countdown);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-row items-center space-x-2 my-4 text-black bg-red-100 p-2">
      <span className="text-gray-800 text-sm md:text-base">
        Limited time offer. Expires in:
      </span>
      <div className="font-mono text-xl md:text-2xl font-bold text-gray-800">
        {formatNumber(time.hours)}:{formatNumber(time.minutes)}:
        {formatNumber(time.seconds)}
      </div>
    </div>
  );
};
