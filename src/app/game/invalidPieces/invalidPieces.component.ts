import { input } from '@angular/core';
import { Component } from '@angular/core';
import { Piece } from '../../models/piece.model';

@Component({
  selector: 'app-invalid-pieces',
  imports: [],
  templateUrl: './invalidPieces.component.html',
  styleUrl: './invalidPieces.component.css',
})
export class InvalidPiecesComponent {
  noPiece = input<Piece[]>([]);
}
