import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { GameStateService } from '../services/gameState.service';
import { ModeComponent } from './mode/mode.component';
import { ReserveRequest } from '../models/reserveRequest.model';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [ModeComponent],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})

export class ReserveComponent {
  private httpService = inject(HttpService);
  private gameStateService = inject(GameStateService);
  private router = inject(Router);

  gameMode: 'normal' | 'cpu' | null = null;
  isDisplay: boolean = true;

  // モードの受け取り
  public GetMode(mode: 'normal' | 'cpu') {
    this.gameMode = mode;
  }

  // パスワード追加
  public AddPassword(passInput: HTMLInputElement): void {
    const password = passInput.value.trim();

    // モード未選択のとき
    if (this.gameMode == null) {
      alert("対戦モードを選択してください")
      return;
    }

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

    const reserve: ReserveRequest = {
      mode: this.gameMode,
      password: passwordNum
    };
    console.log("合言葉(Angular→):", reserve);

    this.postInputPassword(reserve)
  }

  // 合言葉入力したときに呼ばれる
  public postInputPassword(reserve: ReserveRequest): void {
    this.httpService.postInputPassword(reserve).subscribe({
      // 成功
      next: response => {
        console.log("合言葉チェック(←C#):", response);
        if (response) {
          this.gameStateService.setMode(reserve.mode);
          this.gameStateService.setPassword(reserve.password);
          this.router.navigate(['/game']);
        } else {
          alert("既に使用されている合言葉です")
          return;
        }
        isDisplay = false;
      },
      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }

  // ホームに戻る
  public BackHome() {
    this.router.navigate(['/home']);
  }
}
