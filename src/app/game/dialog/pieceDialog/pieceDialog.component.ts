import { Component, input } from '@angular/core';
import { Cell } from '../../../models/cell.model';

@Component({
    selector: 'app-pieceDialog',
    imports: [],
    templateUrl: './pieceDialog.component.html',
    styleUrl: './pieceDialog.component.css',
})
export class PieceDialogComponent {
    cell = input<Cell | null>(null);
    isReverse = input(false);
}