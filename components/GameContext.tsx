import React, { Context, createContext, useState } from "react";
import { InitialBoardState } from "../constants/InitialBoardState";
import { Game } from "../model/Game";
import { GameState } from "../model/GameState";
import { Piece } from "../model/Piece";
import { NodeProps } from "../model/ReactPropsInterfaces";
import { v4 as uuid4 } from "uuid";

export const GameContext: Context<GameState> = createContext({
  playerName: "New Player",
  games: [] as Game[],
  makeTurn: (a, b, c) => {},
});

export const GameProvider = ({ children }: NodeProps) => {
  const [games, setGames] = useState([
    {
      id: uuid4(),
      myPieces: Piece.White,
      currentTurn: Piece.White,
      field: { ...InitialBoardState},
      isFinished: false,
    },
    {
      id: uuid4(),
      myPieces: Piece.White,
      currentTurn: Piece.White,
      field: { ...InitialBoardState},
      isFinished: false,
    },
  ]);
  const makeTurn = (gameId: string, current: string, desired: string) => {
    let game: Game = games.filter((g) => g.id === gameId)[0];

    game.field[desired] = game.field[current];
    game.field[current] = undefined;
    game.currentTurn =
      game.currentTurn === Piece.White ? Piece.Black : Piece.White;
    setGames([game, ...games.filter((g) => g.id !== gameId)]);
  };

  const value: GameState = {
    playerName: "New Player",
    games: games,
    makeTurn: makeTurn,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
