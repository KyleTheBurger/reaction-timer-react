import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Result({ reactionTime }) {
  const [remark, setRemark] = useState("");

  useEffect(() => {
    if (reactionTime >= 1000) {
      setRemark("Too Slow");
    } else {
      setRemark("Fast");
    }
  }, [reactionTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>RESULT!</Text>
      <Text style={styles.text}>Reaction Time: {reactionTime} ms</Text>
      <Text style={styles.text}>Feedback: {remark}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
