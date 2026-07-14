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
import { PieceDialogComponent } from './dialog/pieceDialog/pieceDialog.component';
import { GameJudgeDialogComponent } from "./dialog/gameJudgeDialog/gameJudgeDialog.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent, HandComponent, ResetComponent, PieceDialogComponent, GameJudgeDialogComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {

  // サービスを読みだす
  private httpService = inject(HttpService);
  gameStateService = inject(GameStateService);
  errorService = inject(ErrorService);

  private selectedPieceId: number = 0;  // IDを入れとく変数
  private z: number = 0;  // 高さ情報を入れとく
  gameJudge: number = 0;  // 勝敗判定

  private isGet: boolean = false; // 駒を取得したかどうか
  isPlayer: boolean = true; // 現在のプレイヤー
  showTsukeDialog: boolean = false; // ツケ状態を表示するかどうか
  turn: boolean = Math.random() >= 0.5; // 先行か後攻ランダム

  tsukeDialogCell: Cell | null = null;  // ツケ状態を見るセル
  selectedRulePiece: Piece | null = null; // 移動範囲図を表示する駒


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
          this.selectedRulePiece = null;

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
        this.selectedRulePiece = null;
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
    return piece;
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

  // 駒取得クリック
  ClickGetPiece() {
    this.isGet = true;
    return;
  }

  // ツケ状態の表示
  ShowTsukeDialog(cell: Cell) {
    this.tsukeDialogCell = cell;
    this.showTsukeDialog = true;
    this.selectedRulePiece = null;
  }

  // ツケ状態の非表示
  CloseTsukeDialog() {
    this.showTsukeDialog = false;
  }

  // 各駒の移動範囲画像の表示
  ShowRulePiece(piece: Piece) {
    if (this.selectedRulePiece?.id === piece.id) {
      this.selectedRulePiece = null;
      return;
    }
    this.selectedRulePiece = piece;
    this.tsukeDialogCell = null;
  }

  // 画像のパス
  getRuleImagePath(piece: Piece): string {
    return `./image/rule-image/${piece.pieceName}.png`;
  }
}