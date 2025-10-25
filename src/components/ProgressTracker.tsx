import { Check, Lock, Star, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ProgressTrackerProps {
  currentLevel: number;
  totalLevels: number;
}

const ProgressTracker = ({ currentLevel, totalLevels }: ProgressTrackerProps) => {
  // Calculate completed and remaining questions
  const completedQuestions = currentLevel - 1;
  const remainingQuestions = totalLevels - currentLevel + 1;
  
  // Refs for auto-scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentLevelRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to current level
  useEffect(() => {
    if (currentLevelRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentElement = currentLevelRef.current;
      
      // Calculate scroll position to center the current level
      const containerHeight = container.clientHeight;
      const elementTop = currentElement.offsetTop;
      const elementHeight = currentElement.clientHeight;
      
      const scrollTo = elementTop - (containerHeight / 2) + (elementHeight / 2);
      
      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentLevel]);
  
  return (
    <div className="fixed top-8 left-4 sm:left-16 md:left-20 z-[9999] bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-md rounded-xl border-2 border-primary/40 shadow-2xl max-w-[90px] sm:max-w-none flex flex-col items-center" style={{ maxHeight: '90vh' }}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-center mb-2 sm:mb-3 pb-2 border-b border-primary/20 px-2 sm:px-3 md:px-4 pt-2 sm:pt-3 md:pt-4 flex-shrink-0 w-full">
        <h3 className="text-[10px] sm:text-xs md:text-sm font-bold text-primary tracking-tight text-center">
          <span className="block sm:inline">Quest</span>
          <span className="block sm:inline sm:ml-1">Progress</span>
        </h3>
        {/* <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" /> */}
      </div>
      
      {/* Questions Counter - Fixed */}
      <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold bg-gradient-to-r from-stone-800/40 to-stone-900/40 rounded-lg p-2 border border-stone-700/50 mx-2 sm:mx-3 md:mx-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]">{completedQuestions}</span>
          <span className="text-stone-400">/</span>
          <span className="text-purple-400 drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]">{totalLevels}</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-900/60 to-amber-900/60 border border-orange-600/50 text-center">
          <span className="text-orange-300 drop-shadow-[0_0_4px_rgba(251,146,60,0.6)]">
            {remainingQuestions} left
          </span>
        </div>
      </div>
      
      {/* Scrollable Content Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 pt-2 pb-2 sm:pb-3 md:pb-4 [&::-webkit-scrollbar]:hidden"
      >
        {/* Mobile: Old horizontal wrapping style */}
        <div className="flex flex-col gap-1.5 items-center sm:hidden">
          {Array.from({ length: totalLevels }, (_, i) => {
            const level = i + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;
            
            return (
              <div 
                key={level} 
                className="flex flex-col items-center"
                ref={isCurrent ? currentLevelRef : null}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all relative ${
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
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <motion.span 
                      className="font-black text-sm"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {level}
                    </motion.span>
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                  
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
                
                {i < totalLevels - 1 && (
                  <motion.div
                    className={`h-3 w-0.5 my-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-gradient-to-b from-yellow-400 to-amber-500'
                        : 'bg-stone-700'
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isCompleted ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Desktop: Vertical Progress with Side Decorations */}
        <div className="hidden sm:flex items-start gap-2 sm:gap-3">
        {/* Left Decorations */}
        <div className="flex flex-col gap-2 items-center pt-2">
          {Array.from({ length: totalLevels }, (_, i) => {
            const level = i + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;
            
            return (
              <motion.div
                key={`left-${level}`}
                className="relative"
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }
                    : isCompleted
                    ? {
                        rotate: [0, 360],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {isCompleted ? (
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                ) : isCurrent ? (
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 fill-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-stone-600" />
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Vertical Progress Bar */}
        <div className="flex flex-col gap-1.5 items-center">
          {Array.from({ length: totalLevels }, (_, i) => {
            const level = i + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;
            
            return (
              <div 
                key={level} 
                className="flex flex-col items-center"
                ref={isCurrent ? currentLevelRef : null}
              >
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all relative ${
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
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  ) : isCurrent ? (
                    <motion.span 
                      className="font-black text-base sm:text-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {level}
                    </motion.span>
                  ) : (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
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
                
                {/* Vertical connecting line */}
                {i < totalLevels - 1 && (
                  <motion.div
                    className={`h-4 w-1 my-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-gradient-to-b from-yellow-400 to-amber-500'
                        : 'bg-stone-700'
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isCompleted ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Right Decorations */}
        <div className="flex flex-col gap-2 items-center pt-2">
          {Array.from({ length: totalLevels }, (_, i) => {
            const level = i + 1;
            const isCompleted = level < currentLevel;
            const isCurrent = level === currentLevel;
            
            return (
              <motion.div
                key={`right-${level}`}
                className="relative"
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, -180, -360],
                      }
                    : isCompleted
                    ? {
                        rotate: [0, -360],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {isCompleted ? (
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                ) : isCurrent ? (
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-stone-600" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
