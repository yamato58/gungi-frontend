import { Component, input, output } from '@angular/core';
import { Piece } from '../../models/piece.model';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css',
})

export class PieceComponent {

  // 宣言した変数
  pieceData = input<Piece>(); // 駒情報
  currentTurn = input<boolean>(); // 現在のターン
  showReplay = input<boolean>(false); // リプレイ機能を実行しているかどうか

  selected = output<Piece>(); // 選択された駒情報
  pieceInfo = output<boolean>();  // ツケ状態を表示するかどうか
  closePieceInfo = output<void>();
  showRulePiece = output<Piece>();  // 移動範囲図を見る駒の情報

  // ボタンクリック
  ClickPiece() {
    const data = this.pieceData();
    // データがあるか
    if (data) {
      this.selected.emit(data);
    }
  }

  // ツケ状態の表示
  PieceInfo() {
    const data = this.pieceData();

    if (data) {
      this.pieceInfo.emit(data.player);
    }
  }

  // ツケ状態の非表示
  ClosePieceInfo() {
    this.closePieceInfo.emit();
  }

  // 駒の移動範囲図
  ShowPieceInfo(event: MouseEvent) {
    event.preventDefault();

    const piece = this.pieceData();

    if (piece) {
      this.showRulePiece.emit(piece);
    }
  }
}
