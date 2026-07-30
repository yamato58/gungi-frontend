import { Piece } from './piece.model';

export interface PieceRequest {
    selectPiece: Piece;
    password: number;
}