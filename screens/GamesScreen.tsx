import React, { useContext } from "react";
import { Button, StyleSheet } from "react-native";

import { View } from "../components/Themed";

import { GameContext } from "../components/GameContext";

export default function GamesScreen({ navigation }) {
  const { games, createGame } = useContext(GameContext);

  return (
    <View style={styles.container}>
      {games.map((game) => (
        <Button
          key={game.id}
          title={game.id}
          onPress={() => navigation.navigate("GameScreen", { game: game })}
        ></Button>
      ))}

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button title="Create a new game" onPress={createGame}></Button>
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
