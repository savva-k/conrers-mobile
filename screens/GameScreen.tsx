import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import GameBoard from "../components/GameBoard";

export default function GameScreen({ route }) {
  const { game } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.id}</Text>
      <GameBoard game={game} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
