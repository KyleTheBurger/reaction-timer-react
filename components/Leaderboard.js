import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Leaderboard({ scores }) {
  return (
    <View style={styles.lbcontainer}>
      <Text style={styles.heading}>Leaderboard</Text>
      {scores.length === 0 ? (
        <Text>No record yet</Text>
      ) : (
        <FlatList
          data={scores}
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lbcontainer:{
    height: 240,
    padding: 25,
    position: "relative",
    bottom: 20,
    width: "100%",
    alignItems: "center",
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