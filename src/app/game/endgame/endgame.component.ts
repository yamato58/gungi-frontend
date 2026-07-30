import { Component, output } from '@angular/core';

@Component({
  selector: 'app-endgame',
  imports: [],
  templateUrl: './endgame.component.html',
  styleUrl: './endgame.component.css',
})

export class EndgameComponent {
  endGame = output();

  // ゲーム終了時
  ClickGameEnd() {
    this.endGame.emit();
  }
}
