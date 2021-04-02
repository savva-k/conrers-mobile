import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

import GameBoard from "../components/GameBoard";
import { GameContext } from "../components/GameContext";

export default function TabOneScreen() {
  const { games } = useContext(GameContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <GameBoard game={games[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
