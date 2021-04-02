import React, { useState, useContext } from "react";

import Svg, { Ellipse, Rect, Text } from "react-native-svg";
import { Piece } from "../model/Piece";
import { Cell } from "../model/Cell";
import { GameContext } from "./GameContext";
import { GameProps } from "../model/ReactPropsInterfaces";

const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8].reverse();

const lightSquare: string = "#ccac7e";
const darkSquare: string = "#744c2f";
const cellWidth: number = 50;
const cellHeight: number = 50;

const GameBoard = ({ game }: GameProps) => {
  let currentX: number = 0;
  let currentY: number = 0;
  let cells: any = [];
  let [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined);
  const { makeTurn } = useContext(GameContext);

  const handleTouch = (cell: Cell) => {
    if (selectedCell !== undefined) {
      let previouslySelectedPosition = `${selectedCell.file}${selectedCell.rank}`;
      let maybeSelectedPiece = game.field[previouslySelectedPosition];
      if (maybeSelectedPiece !== undefined) {
        let newlySelectedPosition = `${cell.file}${cell.rank}`;
        let isNewPositionTaken =
          game.field[newlySelectedPosition] !== undefined;
        if (isNewPositionTaken) {
          if (game.field[newlySelectedPosition] !== game.currentTurn) {
            return;
          }
          setSelectedCell(cell);
        } else {
          makeTurn(game.id, previouslySelectedPosition, newlySelectedPosition);
          setSelectedCell(undefined);
        }
      } else {
        setSelectedCell(cell);
      }
    } else {
      let maybeSelectedPiece = `${cell.file}${cell.rank}`;
      if (
        maybeSelectedPiece === undefined ||
        game.field[maybeSelectedPiece] !== game.currentTurn
      ) {
        return;
      }
      setSelectedCell(cell);
    }
  };

  ranks.forEach((rank) => {
    let currentColor: string = rank % 2 === 0 ? lightSquare : darkSquare;

    files.forEach((file) => {
      let isSelected =
        selectedCell &&
        selectedCell.file === file &&
        selectedCell.rank === rank;
      let piece = game.field[`${file}${rank}`];

      cells.push(
        <>
          <Rect
            x={currentX}
            y={currentY}
            width={cellWidth}
            height={cellHeight}
            fill={currentColor}
            strokeWidth={isSelected ? 2 : 0}
            stroke="red"
            onPress={() => handleTouch({ file, rank })}
          />
          {rank === 1 && (
            <Text
              stroke={currentColor === lightSquare ? darkSquare : lightSquare}
              fontSize="10"
              x={currentX + cellWidth - 5}
              y={currentY + cellHeight - 3}
              textAnchor="middle"
            >
              {file}
            </Text>
          )}

          {file === "a" && (
            <Text
              stroke={currentColor === lightSquare ? darkSquare : lightSquare}
              fontSize="10"
              x={currentX + 5}
              y={currentY + 10}
              textAnchor="middle"
            >
              {rank}
            </Text>
          )}

          {piece !== undefined && (
            <Ellipse
              cx={currentX + cellWidth / 2}
              cy={currentY + cellHeight / 2}
              rx="15"
              ry="10"
              fill={piece === Piece.White ? "white" : "black"}
              onPress={() => handleTouch({ file, rank })}
            />
          )}
        </>
      );
      currentColor = currentColor === lightSquare ? darkSquare : lightSquare;
      currentX += cellWidth;
    });
    currentX = 0;
    currentY += cellHeight;
  });

  return <Svg>{cells}</Svg>;
};

export default GameBoard;
