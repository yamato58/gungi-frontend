import { Component } from '@angular/core';
import { output } from '@angular/core';
@Component({
  selector: 'app-reset',
  imports: [],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  reset = output();

  // リセットボタン
  ClickReset() {
    this.reset.emit();
  }
}
