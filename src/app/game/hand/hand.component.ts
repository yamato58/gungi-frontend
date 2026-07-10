import { Component, input, output } from '@angular/core';
import { Piece } from '../../models/piece.model';
import { PieceComponent } from "../piece/piece.component";

@Component({
  selector: 'app-hand',
  standalone: true,
  imports: [PieceComponent],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.css',
})
export class HandComponent {
  blackHandPieces = input<Piece[]>([]);
  whiteHandPieces = input<Piece[]>([]);

  currentTurn = input<boolean>();
  selected = output<Piece>();

  // ボタンクリック
  ClickHandPiece(piece: Piece) {
    // データがあるか
    this.selected.emit(piece);
  }
}
