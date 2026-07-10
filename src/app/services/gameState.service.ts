import { Injectable, inject } from '@angular/core';
import { signal, computed } from '@angular/core';
import { CellArray } from '../models/cell.model';
import { CalculatedData } from '../models/calculatedData.model';
import { MoveResult } from '../models/MoveResult.model';

// サービスをアプリケーション全体で共有し、自動的に依存性注入
@Injectable({
    providedIn: 'root'
})

export class GameStateService {
    // 盤面の駒のsignal
    gameState = signal<CellArray>(new CellArray());

    blackHandPiece = computed(() =>
        this.gameState().handPiece.blackHand
    );

    whiteHandPiece = computed(() =>
        this.gameState().handPiece.whiteHand
    );

    // 移動座標のsignal
    pieceMoveRange = signal<[number, number][]>([]);

    // 盤情報更新
    // UpdateState(response: Piece[]) {
    UpdateState(response: MoveResult) {
        const currentBoard = new CellArray();

        // 駒データを1つずつitemという名前で取り出す
        for (const item of response.pieces) {
            if (item.currentX >= 9 && item.currentY >= 9) {
                currentBoard.invalidPieces.invalidPieces.push(item);
            }
            else if (item.currentX >= 0 && item.currentY >= 0) {
                // if (currentBoard.cellArray[item.currentY][item.currentX].pieces.length >= 1) {
                // }
                // [y][x].piecesにC#側のデータを入れる
                // [y][x].piecesにC#側のデータを入れる
                currentBoard.cellArray[item.currentY][item.currentX].pieces.push(item);

                // 並び替え
                currentBoard.cellArray[item.currentY][item.currentX].pieces.sort(
                    (a, b) => a.currentZ - b.currentZ
                );
            } else if (item.player) {
                // 黒の持ち駒
                currentBoard.handPiece.blackHand.push(item);
            } else {
                // 白の持ち駒
                currentBoard.handPiece.whiteHand.push(item);
            }
        }

        // 盤面更新
        this.gameState.set(currentBoard);

        // if (this.result) {
        //     alert("負けです！");
        // }
        // this.result = false;
    }

    // 移動範囲更新
    MoveRangeDisplay(response: CalculatedData[]) {
        const moveRange: [number, number][] = [];

        // 移動範囲のデータをrangeに入れる
        for (const range of response) {
            // console.log("x: ", range.moveableLocation[0]);
            // console.log("y: ", range.moveableLocation[1]);

            moveRange.push(range.moveableLocation)
        }

        this.pieceMoveRange.set(moveRange);
    }

    ResetMoveRange() {
        this.pieceMoveRange.set([]);
    }
}
