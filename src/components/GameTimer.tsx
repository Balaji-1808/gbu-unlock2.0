import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface GameTimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
  isPaused?: boolean;
  startTime?: number; // Add startTime prop to calculate elapsed time
}

const GameTimer = ({
  durationMinutes,
  onTimeUp,
  isPaused = false,
  startTime,
}: GameTimerProps) => {
  // Calculate initial time left based on elapsed time
  const getInitialTimeLeft = () => {
    if (startTime) {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const totalSeconds = durationMinutes * 60;
      const remaining = totalSeconds - elapsedSeconds;
      return remaining > 0 ? remaining : 0;
    }
    return durationMinutes * 60; // Convert to seconds
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 300; // Warning when 5 minutes or less
  const isCritical = timeLeft <= 60; // Critical when 1 minute or less

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
        isCritical
          ? "bg-red-500/20 text-red-400 animate-pulse"
          : isWarning
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-primary/20 text-primary"
      }`}
    >
      <Clock className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default GameTimer;
