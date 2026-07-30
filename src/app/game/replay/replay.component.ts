import { output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-replay',
  imports: [],
  templateUrl: './replay.component.html',
  styleUrl: './replay.component.css',
})
export class ReplayComponent {
  replayNum = output<number>();

  // 戻る
  ClickReturn() {
    this.replayNum.emit(-1);
    console.log("戻る")
  }

  // 次へ
  ClickNext() {
    this.replayNum.emit(1);
    console.log("次へ")
  }
}
