import { Check, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressTrackerProps {
  currentLevel: number;
  totalLevels: number;
}

const ProgressTracker = ({ currentLevel, totalLevels }: ProgressTrackerProps) => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-md p-2 sm:p-4 rounded-xl border-2 border-primary/40 shadow-2xl max-w-[90px] sm:max-w-none">
      <h3 className="text-[10px] sm:text-sm font-bold text-primary mb-2 sm:mb-3 tracking-tight leading-[1.2] text-center sm:text-left">
        <span className="block sm:inline">Quest</span>
        <span className="block sm:inline sm:ml-1">Progress</span>
      </h3>
      {/* Vertical layout on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 items-center">
        {Array.from({ length: totalLevels }, (_, i) => {
          const level = i + 1;
          const isCompleted = level < currentLevel;
          const isCurrent = level === currentLevel;
          
          return (
            <div key={level} className="flex flex-col sm:flex-row items-center">
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all relative ${
                  isCompleted
                    ? 'bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 border-yellow-400 text-white shadow-lg shadow-yellow-500/50'
                    : isCurrent
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gradient-to-br from-stone-700 to-stone-800 border-stone-600 text-stone-400 shadow-md'
                }`}
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.15, 1],
                        boxShadow: [
                          "0 0 15px rgba(168,85,247,0.5)",
                          "0 0 25px rgba(236,72,153,0.8)",
                          "0 0 15px rgba(168,85,247,0.5)"
                        ],
                      }
                    : isCompleted
                    ? {
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: isCurrent ? 1.5 : 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                ) : isCurrent ? (
                  <motion.span 
                    className="font-black text-sm sm:text-base"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {level}
                  </motion.span>
                ) : (
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                
                {/* Glowing ring effect for current level */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                    animate={{
                      scale: [1, 1.4],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>
              
              {/* Connecting line - vertical on mobile, horizontal on larger screens */}
              {i < totalLevels - 1 && (
                <motion.div
                  className={`h-3 w-0.5 my-0.5 sm:w-4 sm:h-1 sm:mx-0.5 sm:my-0 rounded-full ${
                    isCompleted
                      ? 'bg-gradient-to-b sm:bg-gradient-to-r from-yellow-400 to-amber-500'
                      : 'bg-stone-700'
                  }`}
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: isCompleted ? 1 : 0.3,
                    scaleX: isCompleted ? 1 : 0.3 
                  }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
