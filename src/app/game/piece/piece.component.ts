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
  pieceData = input<Piece>();
  currentTurn = input<boolean>();

  selected = output<Piece>();

  // ボタンクリック
  ClickPiece() {
    const data = this.pieceData();
    // データがあるか
    if (data) {
      this.selected.emit(data);
    }
  }

  pieceInfo = output<boolean>();
  closePieceInfo = output<void>();

  PieceInfo() {
    const data = this.pieceData();

    if (data) {
      this.pieceInfo.emit(data.player);
    }
  }

  ClosePieceInfo() {
    this.closePieceInfo.emit();
  }
}
