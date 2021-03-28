import React, { useState } from "react";

import Svg, { Ellipse, Rect, Text } from "react-native-svg";

const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8].reverse();

const lightSquare: string = "#ccac7e";
const darkSquare: string = "#744c2f";
const cellWidth: number = 50;
const cellHeight: number = 50;

const GameBoard = () => {
  let currentX: number = 0;
  let currentY: number = 0;
  let cells: any = [];
  let [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined);

  ranks.forEach((rank) => {
    let currentColor: string = rank % 2 === 0 ? lightSquare : darkSquare;

    files.forEach((file) => {
      let isSelected =
        selectedCell &&
        selectedCell.file === file &&
        selectedCell.rank === rank;
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
            onPress={() => setSelectedCell({ file, rank })}
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
