import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cell, CellArray } from '../../models/cell.model';
import { Piece } from '../../models/piece.model';
import { PieceComponent } from '../piece/piece.component';
import { TsukeConfirmDialogComponent } from '../dialog/tsukeConfirmDialog/tsukeConfirmDialog.component';
import { GetConfirmDialogComponent } from "../dialog/getConfirmDialog/getConfirmDialog.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, PieceComponent, TsukeConfirmDialogComponent, GetConfirmDialogComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})

// 盤の作成
export class BoardComponent {

  // 宣言した変数
  board = input<CellArray>(new CellArray());  // 盤データ
  turn = input<boolean>();  // 先手か後手か
  showReplay = input<boolean>(false); // リプレイ機能を実行しているかどうか

  selected = output<Piece>(); // 選択された駒情報
  destination = output<Cell>(); // 移動するセル
  getPiece = output<void>();  // 駒を取得したかどうか
  showTsukeDialog = output<Cell>(); // ツケ状態を確認するセル
  closeTsukeDialog = output<void>();  // ツケ状態が表示か非表示か
  showRulePiece = output<Piece>();  // 駒の移動範囲図を表示するかどうか

  calculatedPieces = model<[number, number][]>([]); // 移動範囲データ

  showConfirmDialog = false;
  getConfirmDialog = false;
  canTsuke = true;
  selectedCell: Cell | null = null;

  isMoveableRange(x: number, y: number): boolean {
    // 配列から[x, y]を1行ずつ取り出す
    for (const rangeData of this.calculatedPieces()) {
      if (rangeData[0] === x && rangeData[1] === y) {
        return true; // 光らせる
      }
    }
    return false; // 光らせない
  }

  // 駒クリック
  ClickPiece(piece: Piece) {
    for (const rangeData of this.calculatedPieces()) {
      if (rangeData[0] === piece.currentX && rangeData[1] === piece.currentY) {
        return
      }
    }
    this.selected.emit(piece);
  }

  // セルクリック
  ClickCell(cell: Cell) {
    if (this.isMoveableRange(cell.x, cell.y)) {

      // 取得確認ダイアログ
      if (cell.pieces.length > 0) {
        if (this.turn() !== cell.pieces[cell.pieces.length - 1].player) {
          this.getConfirmDialog = true;
          this.selectedCell = cell;

          if (cell.pieces[cell.pieces.length - 1].currentZ == 2 || cell.pieces[cell.pieces.length - 1].pieceName == "帥") {
            this.canTsuke = false;
            return;
          }
          else if (cell.pieces[cell.pieces.length - 1].currentZ == 1) {
            this.canTsuke = true;
            return;
          }
        }
        this.selectedCell = cell;
        this.showConfirmDialog = true;

        return;
      }
      this.destination.emit(cell);
    }
    // 光っていないマスクリックで空に
    this.calculatedPieces.set([]);
    return;
  }

  // 駒取得
  GetPiece() {
    this.getPiece.emit();

    if (this.selectedCell) {
      this.destination.emit(this.selectedCell);
    }
    this.getConfirmDialog = false;
    this.canTsuke = false;
  }

  // ツケする
  DoTsuke() {
    if (this.selectedCell) {
      this.destination.emit(this.selectedCell);
    }
    this.showConfirmDialog = false;
    this.getConfirmDialog = false;
    this.canTsuke = false;
  }

  // ツケしない
  CancelTsuke() {
    this.showConfirmDialog = false;
    this.getConfirmDialog = false;
    this.canTsuke = false;

    // 光っていないマスクリックで空に
    this.calculatedPieces.set([]);
  }

  // ツケ状態の表示
  PieceInfo(cell: Cell) {
    if (cell.pieces.length > 1) {
      this.showTsukeDialog.emit(cell);
    }
  }

  // ツケ状態非表示
  ClosePieceInfo() {
    this.closeTsukeDialog.emit();
  }
}