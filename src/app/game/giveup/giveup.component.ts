import { output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-giveup',
  imports: [],
  templateUrl: './giveup.component.html',
  styleUrl: './giveup.component.css',
})
export class GiveupComponent {
  giveUp = output();

  // 投了
  ClickGiveUp() {
    this.giveUp.emit();
    console.log("投了")
  }
}
