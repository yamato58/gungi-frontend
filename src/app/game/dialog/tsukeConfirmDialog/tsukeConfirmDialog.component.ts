import { Component } from '@angular/core';
import { input, output } from '@angular/core';
import { CalculatedData } from '../../../models/calculatedData.model';

@Component({
  selector: 'app-tsukeConfirmDialog',
  imports: [],
  templateUrl: './tsukeConfirmDialog.component.html',
  styleUrl: './tsukeConfirmDialog.component.css',
})
export class TsukeConfirmDialogComponent {
  isReverse = input(false);
  confirm = output<void>();
  cancel = output<void>();
  showTsuke = output<void>();

  // ツケする
  ClickDoTsuke() {
    // console.log("ツケ実行");
    this.confirm.emit();
  }

  // ツケしない
  ClickCancelTsuke() {
    this.cancel.emit();
  }

  // HoberPiece() {
  //   this.showTsuke.emit();
  // }
}
