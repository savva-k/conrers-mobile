import { Piece } from "./Piece";

export interface Game {
    id: string,
    myPieces: Piece,
    currentTurn: Piece,
    field: Record<string, Piece | undefined>,
    isFinished: boolean
}
