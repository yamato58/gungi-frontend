import { Component, OnInit, inject } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { HandComponent } from './hand/hand.component';
import { HttpService } from '../services/http.service';
import { GameStateService } from '../services/gameState.service';
import { ErrorService } from '../services/error.service';
import { Cell } from '../models/cell.model';
import { Piece } from '../models/piece.model';
import { MovePiece } from '../models/movePiece.model';
import { ResetComponent } from "./reset/reset.component";
import { GameJudgeDialogComponent } from "./dialog/gameJudgeDialog/gameJudgeDialog.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, HandComponent, ResetComponent, GameJudgeDialogComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {

  // サービスを読みだす
  private httpService = inject(HttpService);
  gameStateService = inject(GameStateService);
  errorService = inject(ErrorService);

  // IDを入れとく変数
  private selectedPieceId: number = 0;

  isPlayer: boolean = true;
  gameJudge: number = 0;
  private isGet: boolean = false;
  private z: number = 0;

  // 先行か後攻ランダム
  turn: boolean = Math.random() >= 0.5;

  // 初めの一回だけ呼ばれる
  ngOnInit(): void {

    this.httpService.getInitialPieces().subscribe({
      // 成功
      next: response => {
        // this.UpdateState(response);
        this.gameStateService.UpdateState(response);
        console.log("初期駒データ(←C#):", response);
      },

      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }

  // 駒をクリックしたときに呼ばれる
  public postSelectedPieces(piece: Piece): void {
    if (this.turn === piece.player) {
      this.httpService.postSelectedPieces(this.ClickPiece(piece)).subscribe({
        // 成功
        next: response => {
          // this.MoveRangeDisplay(response);
          this.gameStateService.MoveRangeDisplay(response)
          console.log("移動できる座標(←C#)", response);
        },

        // 失敗
        error: err => {
          console.error("通信エラーが発生しました:", err);
        }
      });
    }
  }

  // セルをクリックしたときに呼ばれる
  public postSelectedCell(cell: Cell): void {
    this.httpService.postSelectedCell(this.ClickCell(cell)).subscribe({
      // 成功
      next: response => {
        this.gameStateService.UpdateState(response);
        // this.UpdateState(response);
        console.log("変更後駒データ(←C#):", response);

        this.isGet = false;
        this.gameJudge = response.gameResult;
        this.turn = !this.turn;
      },

      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }

  // リセットボタンをクリックしたときに呼ばれる
  public postClickedBoardReset(): void {
    this.httpService.postClickedBoardReset().subscribe({
      // 成功
      next: response => {
        // this.UpdateState(response);
        this.gameStateService.UpdateState(response);
        console.log("リセットデータ(←C#):", response);
        this.turn = Math.random() >= 0.5;
        this.gameJudge = 0;
      },

      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }
  // リセットボタンをクリックしたときに呼ばれる
  public postClickedCellReset(): void {
    this.httpService.postClickedCellReset().subscribe({
      // 成功
      next: response => {
        // this.MoveRangeDisplay(response);
        this.gameStateService.MoveRangeDisplay(response);
        console.log("リセットデータ(←C#):", response);
      },

      // 失敗
      error: err => {
        console.error("通信エラーが発生しました:", err);
      }
    });
  }

  // ボタンクリック
  ClickPiece(piece: Piece) {
    this.selectedPieceId = piece.id;
    this.isPlayer = piece.player;
    this.z = piece.currentZ;

    console.log('選択された駒データ(Angular→):', piece);
    // console.log('選択されたデータ(Angular→):', selectedData);
    return piece;
    // return selectedData;
  }

  // セルクリック
  ClickCell(cell: Cell): MovePiece {
    const movePiece: MovePiece = {
      id: this.selectedPieceId,
      nextX: cell.x,
      nextY: cell.y,
      nextZ: this.z,
      isPlayer: this.isPlayer,
      isGet: this.isGet
    };
    // this.pieceMoveRange.set([]);
    this.gameStateService.ResetMoveRange();
    console.log('移動場所(Angular→):', movePiece);

    return movePiece;
  }

  // リセットクリック
  ClickReset() {
    return;
  }

  ClickGetPiece() {
    this.isGet = true;
    return;
  }
}