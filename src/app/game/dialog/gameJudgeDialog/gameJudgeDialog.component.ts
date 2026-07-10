import { Component } from '@angular/core';
import { input, output } from '@angular/core';

@Component({
  selector: 'app-gameJudgeDialog',
  imports: [],
  templateUrl: './gameJudgeDialog.component.html',
  styleUrl: './gameJudgeDialog.component.css',
})
export class GameJudgeDialogComponent {
  isReverse = input(false);
  gameJudge = input<number>();
  reset = output();

  ClickEnd() {
    this.reset.emit()
  }

  ClickReplay() {

  }
}
