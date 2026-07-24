import { Piece } from './piece.model';

export interface MoveResult {
    pieces: Piece[];
    turn: boolean;
    moveCount: number;
    maxMoveCount: number;
    gameResult: number;
}