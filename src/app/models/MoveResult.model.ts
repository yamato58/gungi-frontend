import { Piece } from './piece.model';

export interface MoveResult {
    pieces: Piece[];
    gameResult: number;
}