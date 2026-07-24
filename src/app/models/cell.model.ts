import { Piece } from "./piece.model";
import { HandPiece } from "./handPiece.model";
import { InvalidPieces } from "./invalidPiece.model";

// マス
export class Cell {
    x: number;
    y: number;
    pieces: Piece[];
    // pieceName: string;
    // hasPiece: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.pieces = [];
        // this.pieceName = "";
        // this.hasPiece = false;
    }
}

// マスの二次元配列
export class CellArray {
    cellArray: Cell[][] = [
        [
            new Cell(0, 0),
            new Cell(1, 0),
            new Cell(2, 0),
            new Cell(3, 0),
            new Cell(4, 0),
            new Cell(5, 0),
            new Cell(6, 0),
            new Cell(7, 0),
            new Cell(8, 0),
        ],
        [
            new Cell(0, 1),
            new Cell(1, 1),
            new Cell(2, 1),
            new Cell(3, 1),
            new Cell(4, 1),
            new Cell(5, 1),
            new Cell(6, 1),
            new Cell(7, 1),
            new Cell(8, 1),
        ],
        [
            new Cell(0, 2),
            new Cell(1, 2),
            new Cell(2, 2),
            new Cell(3, 2),
            new Cell(4, 2),
            new Cell(5, 2),
            new Cell(6, 2),
            new Cell(7, 2),
            new Cell(8, 2),
        ],
        [
            new Cell(0, 3),
            new Cell(1, 3),
            new Cell(2, 3),
            new Cell(3, 3),
            new Cell(4, 3),
            new Cell(5, 3),
            new Cell(6, 3),
            new Cell(7, 3),
            new Cell(8, 3),
        ],
        [
            new Cell(0, 4),
            new Cell(1, 4),
            new Cell(2, 4),
            new Cell(3, 4),
            new Cell(4, 4),
            new Cell(5, 4),
            new Cell(6, 4),
            new Cell(7, 4),
            new Cell(8, 4),
        ],
        [
            new Cell(0, 5),
            new Cell(1, 5),
            new Cell(2, 5),
            new Cell(3, 5),
            new Cell(4, 5),
            new Cell(5, 5),
            new Cell(6, 5),
            new Cell(7, 5),
            new Cell(8, 5),
        ],
        [
            new Cell(0, 6),
            new Cell(1, 6),
            new Cell(2, 6),
            new Cell(3, 6),
            new Cell(4, 6),
            new Cell(5, 6),
            new Cell(6, 6),
            new Cell(7, 6),
            new Cell(8, 6),
        ],
        [
            new Cell(0, 7),
            new Cell(1, 7),
            new Cell(2, 7),
            new Cell(3, 7),
            new Cell(4, 7),
            new Cell(5, 7),
            new Cell(6, 7),
            new Cell(7, 7),
            new Cell(8, 7),
        ],
        [
            new Cell(0, 8),
            new Cell(1, 8),
            new Cell(2, 8),
            new Cell(3, 8),
            new Cell(4, 8),
            new Cell(5, 8),
            new Cell(6, 8),
            new Cell(7, 8),
            new Cell(8, 8),
        ]
    ];
    handPiece: HandPiece = new HandPiece;
    invalidPieces: InvalidPieces = new InvalidPieces;
}