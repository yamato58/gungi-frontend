import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cell, CellArray } from '../../models/cell.model';
import { Piece } from '../../models/piece.model';
import { PieceComponent } from '../piece/piece.component';
import { TsukeConfirmDialogComponent } from '../dialog/tsukeConfirmDialog/tsukeConfirmDialog.component';
import { PieceDialogComponent } from '../dialog/pieceDialog/pieceDialog.component';
import { GetConfirmDialogComponent } from "../dialog/getConfirmDialog/getConfirmDialog.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, PieceComponent, TsukeConfirmDialogComponent, PieceDialogComponent, GetConfirmDialogComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})

// 盤の作成
export class BoardComponent {
  // 盤データ
  board = input<CellArray>(new CellArray());

  turn = input<boolean>();

  // 移動範囲データ
  calculatedPieces = model<[number, number][]>([]);

  isMoveableRange(x: number, y: number): boolean {
    // 配列から[x, y]を1行ずつ取り出す
    for (const rangeData of this.calculatedPieces()) {
      if (rangeData[0] === x && rangeData[1] === y) {
        return true; // 光らせる
      }
    }
    return false; // 光らせない
  }

  // 選択された駒情報
  selected = output<Piece>();
  // 移動するセル
  destination = output<Cell>();

  getPiece = output<void>();

  // selectedPlayer = true;

  // 駒クリック
  ClickPiece(piece: Piece) {
    for (const rangeData of this.calculatedPieces()) {
      if (rangeData[0] === piece.currentX && rangeData[1] === piece.currentY) {
        return
      }
    }
    // this.selectedPlayer = piece.player;
    this.selected.emit(piece);
  }

  showConfirmDialog = false;
  getConfirmDialog = false;
  hoverPlayer = true;
  canTsuke = true;
  selectedCell: Cell | null = null;

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

  showTsukeDialog = false;

  // ツケ状態の表示
  PieceInfo(cell: Cell, player: boolean) {
    if (cell.pieces.length > 1) {
      this.selectedCell = cell;
      this.hoverPlayer = player;
      this.showTsukeDialog = true;
    }
  }

  // ツケ状態非表示
  ClosePieceInfo() {
    this.showTsukeDialog = false;
  }
}