import React, { useContext } from "react";
import { Button, StyleSheet } from "react-native";

import { View } from "../components/Themed";

import { GameContext } from "../components/GameContext";

export default function GamesScreen({ navigation }) {
  const { games } = useContext(GameContext);

  return (
    <View style={styles.container}>
      {games.map((game) => (
        <Button
          key={game.id}
          title={game.id}
          onPress={() => navigation.navigate("GameScreen", { game: game })}
        ></Button>
      ))}
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
