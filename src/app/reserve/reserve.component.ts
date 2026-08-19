import { Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { GameStateService } from '../services/gameState.service';
import { ModeComponent } from './mode/mode.component';
import { ReserveRequest } from '../models/reserveRequest.model';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [ModeComponent],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})

export class ReserveComponent {
  private httpService = inject(HttpService);
  private errorService = inject(ErrorService);
  private gameStateService = inject(GameStateService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  gameMode: 'normal' | 'cpu' | null = null;
  isLoading: boolean = false;
  debug = "";

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
    this.debug = "パスワード入力";
    this.postInputPassword(reserve)
  }

  // 合言葉入力したときに呼ばれる
  public async postInputPassword(reserve: ReserveRequest): Promise<void> {
    try {
      this.isLoading = true;
      this.debug = "firstValueFrom";
      this.debug = "通信開始";
      const response = await firstValueFrom(
        this.httpService.postInputPassword(reserve)
      );
      this.debug = "通信完了";

      console.log("合言葉チェック(←C#):", response);
      if (!response) {
        alert("既に使用されている合言葉です");
        return;
      }
      this.debug = "setMode";
      this.gameStateService.setMode(reserve.mode);
      this.debug = "setPassword";
      this.gameStateService.setPassword(reserve.password);
      this.debug = "画面遷移";
      this.router.navigate(['/game']);

    } catch (err) {
      this.debug = "エラー";
      this.errorService.HttpError(err);
    } finally {
      this.isLoading = false;
      // 手動で更新
      this.cdr.detectChanges();
    }
  }

  // ホームに戻る
  public BackHome() {
    this.router.navigate(['/home']);
  }
}
