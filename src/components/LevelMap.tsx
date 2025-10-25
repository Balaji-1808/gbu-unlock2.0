import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxBackground from "./ParallaxBackground";
import { Sparkles, Lock, Crown, Star, Gem, Coins, Trophy, Zap } from "lucide-react";

interface LevelNode {
  number: number;
  locked: boolean;
  completed: boolean;
  current: boolean;
}

interface LevelMapProps {
  currentLevel: number;
  totalLevels: number;
  completedLevels: number;
  onLevelClick?: (level: number) => void;
}

const LevelMap = ({
  currentLevel,
  totalLevels,
  completedLevels,
  onLevelClick,
}: LevelMapProps) => {
  const [levels, setLevels] = useState<LevelNode[]>([]);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  useEffect(() => {
    const newLevels = Array.from({ length: totalLevels }, (_, i) => ({
      number: i + 1,
      locked: i + 1 > currentLevel,
      completed: i + 1 < currentLevel,
      current: i + 1 === currentLevel,
    }));
    setLevels(newLevels);
  }, [currentLevel, totalLevels]);

  // Calculate vertical spacing based on screen size
  const getVerticalSpacing = () => {
    const isMobile = window.innerWidth < 768;
    const isLaptop = window.innerWidth >= 1024;
    return isMobile ? 150 : isLaptop ? 400 : 250;
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto p-2 sm:p-4 md:p-8 mt-24">
      {/* Enhanced background with moving particles */}
      <ParallaxBackground />

      {/* LEFT SIDE DECORATIONS */}
      <div className="hidden lg:block absolute left-1/2 -ml-[280px] xl:-ml-[340px] top-0 bottom-0 w-32 xl:w-40 pointer-events-none">
        {/* Decorative border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
        
        {/* Milestone markers */}
        {levels.map((level, index) => {
          const verticalSpacing = getVerticalSpacing();
          const yPosition = 50 + index * verticalSpacing;
          
          return (
            <motion.div
              key={`left-marker-${index}`}
              className="absolute left-4"
              style={{ top: `${yPosition}px` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: level.completed ? 1 : 0.3, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Decorative scroll with level info */}
              <div className={`relative ${level.completed ? 'opacity-100' : 'opacity-60'}`}>
                                <motion.div
                  className={`px-4 py-2 rounded-r-lg border-l-4 backdrop-blur-md shadow-lg ${
                    level.completed 
                      ? 'border-yellow-500 bg-gradient-to-r from-amber-900/80 to-yellow-900/60' 
                      : level.current
                      ? 'border-purple-400 bg-gradient-to-r from-purple-800/95 to-pink-800/85'
                      : 'border-stone-600 bg-gradient-to-r from-stone-900/50 to-stone-800/40'
                  }`}
                  whileHover={{ scale: 1.05, x: 5 }}
                  animate={level.current ? { 
                    boxShadow: [
                      '0 0 10px rgba(168,85,247,0.5)',
                      '0 0 20px rgba(236,72,153,0.7)',
                      '0 0 10px rgba(168,85,247,0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    {level.completed && <Trophy className="w-4 h-4 text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />}
                    {level.current && <Zap className="w-4 h-4 text-purple-200 drop-shadow-[0_0_8px_rgba(216,180,254,1)]" />}
                    {level.locked && <Lock className="w-3 h-3 text-stone-400" />}
                    <span className={`text-sm font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] ${
                      level.completed ? 'text-yellow-300' : 
                      level.current ? 'text-purple-200' : 
                      'text-stone-400'
                    }`}>
                      Stage {level.number}
                    </span>
                  </div>
                  {level.completed && (
                    <motion.div
                      className="absolute -right-1 top-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Floating decorative elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`left-float-${i}`}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}px`,
              top: `${100 + i * 150}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {i % 3 === 0 ? (
              <Gem className="w-6 h-6 text-amber-500/40" />
            ) : i % 3 === 1 ? (
              <Coins className="w-6 h-6 text-yellow-400/40" />
            ) : (
              <Crown className="w-6 h-6 text-yellow-500/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* RIGHT SIDE DECORATIONS */}
      <div className="hidden lg:block absolute right-1/2 -mr-[280px] xl:-mr-[340px] top-0 bottom-0 w-32 xl:w-40 pointer-events-none">
        {/* Decorative border */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
        
        {/* Treasure counter/stats */}
        {levels.map((level, index) => {
          const verticalSpacing = getVerticalSpacing();
          const yPosition = 50 + index * verticalSpacing;
          
          return (
            <motion.div
              key={`right-stat-${index}`}
              className="absolute right-4"
              style={{ top: `${yPosition}px` }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: level.completed ? 1 : 0.3, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {level.completed && (
                <motion.div
                  className="px-4 py-2 rounded-l-lg border-r-4 border-yellow-500 bg-gradient-to-l from-amber-900/80 to-yellow-900/60 backdrop-blur-md shadow-lg"
                  whileHover={{ scale: 1.05, x: -5 }}
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(251,191,36,0.3)',
                      '0 0 20px rgba(251,191,36,0.5)',
                      '0 0 10px rgba(251,191,36,0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-black text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Unlocked!</span>
                    <Sparkles className="w-4 h-4 text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
                  </div>
                  {/* Burst effect */}
                  <motion.div
                    className="absolute -left-1 top-1/2 -translate-y-1/2"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                      opacity: [0.8, 0.3, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
                  </motion.div>
                </motion.div>
              )}
              {level.current && (
                <motion.div
                  className="px-4 py-2 rounded-l-lg border-r-4 border-purple-400 bg-gradient-to-l from-purple-800/95 to-pink-800/85 backdrop-blur-md shadow-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 15px rgba(168,85,247,0.6)',
                      '0 0 25px rgba(236,72,153,0.8)',
                      '0 0 15px rgba(168,85,247,0.6)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-black text-purple-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">Active Quest</span>
                    <Zap className="w-4 h-4 text-purple-200 fill-purple-100 drop-shadow-[0_0_8px_rgba(216,180,254,1)]" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
        
        {/* Floating decorative elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`right-float-${i}`}
            className="absolute"
            style={{
              right: `${20 + Math.random() * 60}px`,
              top: `${100 + i * 150}px`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, -10, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {i % 3 === 0 ? (
              <Trophy className="w-6 h-6 text-yellow-500/40" />
            ) : i % 3 === 1 ? (
              <Star className="w-6 h-6 text-amber-400/40 fill-amber-400/40" />
            ) : (
              <Sparkles className="w-6 h-6 text-yellow-300/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating ambient decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {i % 3 === 0 ? (
              <Gem className="w-5 h-5 text-primary/30" />
            ) : i % 3 === 1 ? (
              <Coins className="w-5 h-5 text-amber-400/30" />
            ) : (
              <Star className="w-4 h-4 text-yellow-300/30" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Container for Level Nodes */}
      <div
        className="relative w-full"
        style={{
          minHeight: `${
            window.innerWidth < 768
              ? 150 * totalLevels + 300
              : window.innerWidth >= 1024
              ? 400 * totalLevels + 400
              : 250 * totalLevels + 400
          }px`,
        }}
      >
        {/* Connecting lines between levels */}
        {levels.map((level, index) => {
          if (index === levels.length - 1) return null;

          const verticalSpacing = getVerticalSpacing();
          const isCompleted = index < currentLevel - 1;

          return (
            <div
              key={`line-${index}`}
              style={{
                position: "absolute",
                left: "50%",
                top: `${
                  50 + (index + 1) * verticalSpacing - verticalSpacing / 2
                }px`,
                transform: "translateX(-50%)",
                zIndex: 1,
                pointerEvents: "none",
                height: `${verticalSpacing}px`,
              }}
            >
              {/* Main rope/chain pathway */}
              <div className="relative w-full h-full flex justify-center">
                {/* Left rope */}
                <motion.div
                  className={`absolute left-[-20px] w-2 h-full rounded-full ${
                    isCompleted
                      ? "bg-gradient-to-b from-amber-600 via-yellow-500 to-amber-600"
                      : "bg-gradient-to-b from-stone-600 via-stone-500 to-stone-600"
                  }`}
                  style={{
                    boxShadow: isCompleted
                      ? "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                      : "0 0 5px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.3)",
                  }}
                  animate={
                    isCompleted
                      ? {
                          boxShadow: [
                            "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                            "0 0 25px rgba(251, 191, 36, 0.9), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                            "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Right rope */}
                <motion.div
                  className={`absolute right-[-20px] w-2 h-full rounded-full ${
                    isCompleted
                      ? "bg-gradient-to-b from-amber-600 via-yellow-500 to-amber-600"
                      : "bg-gradient-to-b from-stone-600 via-stone-500 to-stone-600"
                  }`}
                  style={{
                    boxShadow: isCompleted
                      ? "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)"
                      : "0 0 5px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.3)",
                  }}
                  animate={
                    isCompleted
                      ? {
                          boxShadow: [
                            "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                            "0 0 25px rgba(251, 191, 36, 0.9), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                            "0 0 15px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* Ornate chain links in center */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`chain-${i}`}
                    className={`absolute w-6 h-8 border-4 rounded-full ${
                      isCompleted
                        ? "border-yellow-500 bg-gradient-to-br from-amber-400 to-yellow-600"
                        : "border-stone-600 bg-gradient-to-br from-stone-700 to-stone-800"
                    }`}
                    style={{
                      top: `${(i * verticalSpacing) / 8}px`,
                      left: "50%",
                      marginLeft: "-12px", // Half of width to center
                      boxShadow: isCompleted
                        ? "0 0 10px rgba(234, 179, 8, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3)"
                        : "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                    animate={
                      isCompleted
                        ? {
                            rotate: i % 2 === 0 ? [0, 5, 0] : [90, 95, 90],
                            scale: [1, 1.05, 1],
                          }
                        : {
                            rotate: i % 2 === 0 ? 0 : 90,
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Floating energy particles for completed paths */}
                {isCompleted && (
                  <>
                    {/* Traveling sparkles */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute"
                        style={{
                          left: "50%",
                        }}
                        animate={{
                          top: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                          scale: [0.5, 1, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    ))}

                    {/* Floating coins along the path */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={`coin-${i}`}
                        className="absolute"
                        style={{
                          left: i % 2 === 0 ? "20%" : "80%",
                        }}
                        animate={{
                          top: ["0%", "100%"],
                          x: [0, (i % 2 === 0 ? 10 : -10), 0],
                          rotate: [0, 360],
                          opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeInOut",
                        }}
                      >
                        <Coins className="w-3 h-3 text-amber-400" />
                      </motion.div>
                    ))}

                    {/* Glowing orbs */}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <motion.div
                        key={`orb-${i}`}
                        className="absolute w-3 h-3 rounded-full bg-gradient-radial from-yellow-400 to-amber-600"
                        style={{
                          left: "50%",
                          transform: "translateX(-50%)",
                          boxShadow: "0 0 15px rgba(251, 191, 36, 0.8)",
                        }}
                        animate={{
                          top: ["0%", "100%"],
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 1.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Level Nodes - Treasure Chests */}
        {levels.map((level, index) => {
          const verticalSpacing = getVerticalSpacing();
          const yPosition = 50 + index * verticalSpacing;

          return (
            <motion.div
              key={`level-${level.number}`}
              id={`chest-${level.number}`}
              className="absolute left-1/2 z-20"
              style={{
                top: `${yPosition}px`,
                transform: "translateX(-50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Treasure Chest Container */}
              <motion.div
                className={`relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex flex-col items-center justify-center font-bold text-base sm:text-lg md:text-2xl transition-all ${
                  level.current
                    ? "cursor-pointer drop-shadow-2xl"
                    : level.completed
                    ? "cursor-not-allowed drop-shadow-lg"
                    : "cursor-not-allowed drop-shadow-lg"
                }`}
                whileHover={level.current ? { scale: 1.1, y: -10, rotate: 3 } : {}}
                whileTap={level.current ? { scale: 0.95, y: 5 } : {}}
                onClick={() => {
                  if (level.current && onLevelClick) {
                    onLevelClick(level.number);
                  }
                }}
                animate={
                  level.completed
                    ? {}
                    : level.current
                    ? { scale: [1, 1.08, 1] }
                    : {
                        scale: [1, 1.08, 1],
                      }
                }
              >
                {level.completed ? (
                  <>
                    {/* Glow effect background for completed chest */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/60 via-amber-400/60 to-yellow-400/60 blur-2xl z-0"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>

                    {/* Open chest image */}
                    <img
                      src="/open-chest.webp"
                      alt="Open chest"
                      className="w-full h-full object-contain z-10 drop-shadow-2xl"
                    />
                  </>
                ) : level.locked ? (
                  <>
                    {/* Dark mysterious aura for locked chest */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-700/40 via-stone-600/40 to-stone-700/40 blur-2xl z-0"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Closed chest with grayscale */}
                    <img
                      src="/closed-chest.webp"
                      alt="Locked chest"
                      className="w-full h-full object-contain z-10 grayscale opacity-60"
                    />

                    {/* Large pulsing lock icon */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Lock className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-stone-500 drop-shadow-[0_0_10px_rgba(120,113,108,0.8)]" />
                    </motion.div>

                    {/* Mysterious smoke/fog particles around locked chest */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={`fog-${i}`}
                        className="absolute w-8 h-8 sm:w-12 sm:h-12 bg-stone-600/20 rounded-full blur-xl z-5"
                        style={{
                          left: `${20 + (i % 3) * 30}%`,
                          top: `${30 + Math.floor(i / 3) * 40}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0.4, 0.2],
                          x: [0, (i % 2 === 0 ? 10 : -10), 0],
                          y: [0, (i % 2 === 0 ? -10 : 10), 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Chains wrapping effect */}
                    <motion.div
                      className="absolute left-0 right-0 top-1/3 h-2 bg-gradient-to-r from-transparent via-stone-600/60 to-transparent z-25"
                      animate={{
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute left-0 right-0 bottom-1/3 h-2 bg-gradient-to-r from-transparent via-stone-600/60 to-transparent z-25"
                      animate={{
                        opacity: [0.7, 0.4, 0.7],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
                    />

                    {/* Dark energy particles */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute z-20"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: [0, (Math.cos((i / 4) * Math.PI * 2) * 40)],
                          y: [0, (Math.sin((i / 4) * Math.PI * 2) * 40)],
                          opacity: [0, 0.6, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <div className="w-2 h-2 bg-stone-500 rounded-full shadow-[0_0_8px_rgba(120,113,108,0.6)]" />
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    {/* Closed chest image */}
                    <img
                      src="/closed-chest.webp"
                      alt="Closed chest"
                      className="w-full h-full object-contain z-10"
                    />
                  </>
                )}

              </motion.div>

              {/* Level Number Badge */}
              <div
                className={`absolute text-nowrap z-30 text-xs sm:text-sm md:text-base font-bold
                bottom-12 sm:bottom-10 md:bottom-8 left-1/2 transform -translate-x-1/2
                lg:left-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:-right-24 lg:translate-x-0`}
                style={{
                  color: level.locked
                    ? "#9ca3af"
                    : level.completed
                    ? "#eab308"
                    : "#f59e0b",
                }}
              >
                <span className="font-bold">{level.number}</span>
              </div>

              {/* Status Label */}
              {level.locked && (
                <p
                  className="absolute text-center text-xs font-bold text-stone-600 uppercase tracking-wider
                  bottom-4 sm:bottom-2 md:bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  lg:left-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:-right-20 lg:tracking-normal"
                >
                  Locked
                </p>
              )}
              {level.completed && (
                <p
                  className="absolute text-center text-xs font-bold text-yellow-600 uppercase tracking-wider
                  bottom-4 sm:bottom-2 md:bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  lg:left-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:-right-20 lg:tracking-normal"
                >
                  ✓ Completed
                </p>
              )}
              {level.current && (
                <p
                  className="absolute text-center text-xs font-bold text-amber-600 uppercase tracking-wider animate-pulse
                  bottom-4 sm:bottom-2 md:bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  lg:left-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:-right-20 lg:tracking-normal"
                >
                  → Solve Now
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMap;
