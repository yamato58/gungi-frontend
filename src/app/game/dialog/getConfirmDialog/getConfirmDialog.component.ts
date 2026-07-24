import { Component } from '@angular/core';
import { input, output } from '@angular/core';
import { TsukeConfirmDialogComponent } from '../tsukeConfirmDialog/tsukeConfirmDialog.component';

@Component({
    selector: 'app-getConfirmDialog',
    imports: [],
    templateUrl: './getConfirmDialog.component.html',
    styleUrl: './getConfirmDialog.component.css',
})
export class GetConfirmDialogComponent extends TsukeConfirmDialogComponent {
    getPiece = output<void>();
    canTsuke = input<boolean>(true);

    // 駒取得
    ClickGetPiece() {
        this.getPiece.emit();
    }
}
