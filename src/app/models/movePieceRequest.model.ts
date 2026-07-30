import { MovePiece } from './movePiece.model';

export interface MovePieceRequest {
    movePiece: MovePiece
    password: number;
}