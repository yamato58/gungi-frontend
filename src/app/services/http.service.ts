import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';
import { CalculatedData } from '../models/calculatedData.model';
import { MovePiece } from '../models/movePiece.model';
import { MoveResult } from '../models/moveResult.model';

// サービスをアプリケーション全体で共有し、自動的に依存性注入
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    // HttpClient(getやpostをするのに必要な機能)の注入
    private http = inject(HttpClient);

    // C#側にリクエスト
    // getInitialPieces(): Observable<MoveResult> {
    //     return this.http.get<MoveResult>('/api/game/initial-data');
    // }

    // // クリックした駒情報を送信、移動可能範囲を受け取り
    // postSelectedPieces(postdata: Piece): Observable<CalculatedData[]> {
    //     return this.http.post<CalculatedData[]>('/api/game/select-data', postdata);
    // }

    // // 移動先の情報を送信、移動後の駒データの受け取り
    // postSelectedCell(movePiece: MovePiece): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('/api/game/next-data', movePiece);
    // }

    // // 何も送信しない、初期盤面の情報を受け取り
    // postClickedBoardReset(): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('/api/game/boardreset-data', null);
    // }

    // // 何も送信しない、リセット後の移動範囲を受け取り
    // postClickedCellReset(): Observable<CalculatedData[]> {
    //     return this.http.post<CalculatedData[]>('/api/game/cellreset-data', null);
    // }

    // // 見たいリプレイ盤面が前か後かを送信、その盤の情報を受け取り
    // postClickedReplay(replayNum: number): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('/api/game/replay-data', replayNum);
    // }

    // デプロイ用
    getInitialPieces(): Observable<moveResult> {
        return this.http.get<moveResult>('https://gungi-backend.onrender.com/game/initial-data');
    }

    postSelectedPieces(postdata: Piece): Observable<CalculatedData[]> {
        return this.http.post<CalculatedData[]>('https://gungi-backend.onrender.com/game/select-data', postdata);
    }

    postSelectedCell(movePiece: movePiece): Observable<MoveResult> {
        return this.http.post<moveResult>('https://gungi-backend.onrender.com/game/next-data', movePiece);
    }

    postClickedBoardReset(): Observable<moveResult> {
        return this.http.post<moveResult>('https://gungi-backend.onrender.com/game/boardreset-data', null);
    }

    postClickedCellReset(): Observable<CalculatedData[]> {
        return this.http.post<CalculatedData[]>('https://gungi-backend.onrender.com/game/cellreset-data', null);
    }

    postClickedReplay(replayNum: number): Observable<MoveResult> {
        return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/cellreset-data', replayNum);
    }
}
