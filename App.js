import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Block from "./components/Block";
import Result from "./components/Result";

export default function App() {
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

    setRecentScores((prevScores) => {
      const updatedScores = [reactionTime, ...prevScores];
      return updatedScores.slice(0, 5);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading} numberOfLines={2}>Click "Play" to start the real game</Text>
      <View style={styles.container1}>
        {!isPlaying && (
          <TouchableOpacity
            style={styles.button}
            onPress={start}
            disabled={isPlaying}
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        )}
        {!isPlaying && (
          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Reset Leaderboard</Text>
          </TouchableOpacity>
        )}
        {isPlaying && <Block delay={delay} onEnd={endGame} />}
        {gameIsEnd && <Result reactionTime={score} />}
      </View>

      {gameIsEnd && (
        <TouchableOpacity style={styles.button} onPress={restart}>
          <Text style={styles.buttonText}>RESTART</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subheading}>Leaderboard</Text>
      {recentScores.length === 0 ? (
        <Text> No record yet </Text>
      ) : (
        <FlatList
          data={recentScores}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>#{index + 1}</Text>
              <Text style={styles.cell}>{item} ms</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
  },
  container1: {
    width: 300,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgb(79, 184, 112)",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    fontSize: 16,
  },
});
