import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rule',
  imports: [],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css',
})
export class RuleComponent {
  private router = inject(Router);

  // ホームに戻る
  public BackHome() {
    this.router.navigate(['/home']);
  }
}