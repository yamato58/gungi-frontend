import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { GameStateService } from '../services/gameState.service';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})

export class ReserveComponent {
  private httpService = inject(HttpService);
  private gameStateService = inject(GameStateService);
  private router = inject(Router);

  public AddPassword(passInput: HTMLInputElement): void {
    const password = passInput.value.trim();

    // 空のとき
    if (password === "") {
      alert("合言葉を入力してください")
      return;
    }

    // 数字ではないとき
    if (Number.isNaN(Number(password))) {
      alert("数字を入力してください")
      return;
    }

    // 4桁じゃないとき
    if (password.length !== 4) {
      alert("4文字で入力してください");
      return;
    }

    const passwordNum = Number(password);
    this.postInputPassword(passwordNum)
  }

  // 合言葉入力したときに呼ばれる
  public postInputPassword(password: number): void {
    this.httpService.postInputPassword(password).subscribe({
      // 成功
      next: response => {
        console.log("合言葉チェック(←C#):", response);
        if (response) {
          this.gameStateService.setPassword(password);
          this.router.navigate(['/game']);
        } else {
          alert("既に使用されている合言葉です")
          return;
        }
      },
      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }

  public BackHome() {
    this.router.navigate(['/home']);
  }
}
