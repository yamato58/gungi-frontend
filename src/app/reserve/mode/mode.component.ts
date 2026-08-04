import { Component, output } from '@angular/core';

@Component({
  selector: 'app-mode',
  imports: [],
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.css',
})
export class ModeComponent {
  selectedMode: 'normal' | 'cpu' | null = null;

  gameMode = output<'normal' | 'cpu'>();

  public SelectedMode(mode: 'normal' | 'cpu') {
    this.selectedMode = mode;

    this.gameMode.emit(this.selectedMode);
  }
}
