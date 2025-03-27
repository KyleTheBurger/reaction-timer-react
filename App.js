import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameProvider, GameContext } from "./context/GameContext";
import Block from "./components/Block";
import Result from "./components/Result";
import Button from "./components/Button";
import Leaderboard from "./components/Leaderboard";

function GameScreen() {
  const {
    isPlaying,
    gameIsEnd,
    start,
    restart,
    reset,
    recentScores,
    endGame,
    delay,
  } = useContext(GameContext);

  return (
    <View style={styles.container}>
      {!isPlaying && <Text style={styles.heading}>Click "Play" to start the real game</Text>}
      {!isPlaying && <Button title="Play" onPress={start} />}
      {!isPlaying && <Button title="Reset Leaderboard" onPress={reset} />}
      {isPlaying && <Block delay={delay} onEnd={endGame} />}
      {gameIsEnd && <Result reactionTime={recentScores[0]} />}
      {gameIsEnd && <Button title="Restart" onPress={restart} />}
      {gameIsEnd && <Leaderboard scores={recentScores} />}
    </View>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
});
