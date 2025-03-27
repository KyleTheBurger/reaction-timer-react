import React, { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [delay, setDelay] = useState(null);
  const [score, setScore] = useState(0);
  const [gameIsEnd, setGameIsEnd] = useState(false);
  const [recentScores, setRecentScores] = useState([]);

  const start = () => {
    setDelay(2000 + Math.random() * 5000);
    setIsPlaying(true);
  };

  const restart = () => {
    setIsPlaying(false);
    setGameIsEnd(false);
  };

  const reset = () => {
    setRecentScores([]);
  };

  const endGame = (reactionTime) => {
    setScore(reactionTime);
    setGameIsEnd(true);
    setRecentScores((prev) => [reactionTime, ...prev].slice(0, 5));
  };

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        delay,
        score,
        gameIsEnd,
        recentScores,
        start,
        restart,
        reset,
        endGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
