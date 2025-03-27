import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Block({ delay, onEnd }) {
  const [reactionTime, setReactionTime] = useState(0);
  const [showBlock, setShowBlock] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isBlockDisable, setIsBlockDisable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBlock(true);
      startTimer();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  const startTimer = () => {
    const interval = setInterval(() => {
      setReactionTime((prevTime) => prevTime + 10);
    }, 10);
    setTimer(interval);
  };

  const stopTimer = () => {
    if (isBlockDisable) return;
    setIsBlockDisable(true);
    clearInterval(timer);
    onEnd(reactionTime);
  };

  return (
    <>
      {showBlock ? (
        <TouchableOpacity
          style={[styles.block, isBlockDisable && styles.disabledBlock]}
          onPress={stopTimer}
          disabled={isBlockDisable}
        >
          <Text style={styles.text}>
            {isBlockDisable ? "Good Job!" : "Click Me Quick!"}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text>READY UR BALLS . . .</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    width: 200,
    height: 200,
    backgroundColor: "rgb(64, 156, 93)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  disabledBlock: {
    backgroundColor: "gray",
  },
});
