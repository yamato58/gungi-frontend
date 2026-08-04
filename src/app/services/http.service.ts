import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PieceRequest } from '../models/pieceRequest.model';
import { CalculatedData } from '../models/calculatedData.model';
import { MoveResult } from '../models/moveResult.model';
import { MovePieceRequest } from '../models/movePieceRequest.model';
import { ReplayRequest } from '../models/replayRequest.model';
import { ReserveRequest } from '../models/reserveRequest.model';

// サービスをアプリケーション全体で共有し、自動的に依存性注入
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    // HttpClient(getやpostをするのに必要な機能)の注入
    private http = inject(HttpClient);

    // 合言葉を送信、合言葉が使えるかの結果受け取り
    postInputPassword(reserve: ReserveRequest): Observable<boolean> {
        return this.http.post<boolean>('/api/game/password-data', reserve);
    }

    // 合言葉を送信、初期駒データを受け取り
    postInitialPieces(password: number): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/initial-data', password);
    }

    // クリックした駒情報、合言葉を送信、移動可能範囲を受け取り
    postSelectedPieces(request: PieceRequest): Observable<CalculatedData[]> {
        return this.http.post<CalculatedData[]>('/api/game/select-data', request);
    }

    // 移動先の情報、合言葉を送信、移動後の駒データの受け取り
    postSelectedCell(movePiece: MovePieceRequest): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/next-data', movePiece);
    }

    // CPU用通信
    postMoveCPU(password: number): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/cpu-data', password);
    }

    // 合言葉を送信、初期盤面の情報を受け取り
    postClickedBoardReset(password: number): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/boardreset-data', password);
    }

    // 見たいリプレイ盤面が前か後かを送信、その盤の情報を受け取り
    postClickedReplay(replayRequest: ReplayRequest): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/replay-data', replayRequest);
    }

    // 合言葉を送信、投了時の駒データの受け取り
    postClickedGiveUp(password: number): Observable<MoveResult> {
        return this.http.post<MoveResult>('/api/game/give-data', password);
    }

    // 合言葉を送信、終了できるか受け取り
    postClickedGameEnd(password: number): Observable<boolean> {
        return this.http.post<boolean>('/api/game/end-data', password)
    }

    // デプロイ用
    // postInputPassword(password: number): Observable<boolean> {
    //     return this.http.post<boolean>('https://gungi-backend.onrender.com/game/password-data', password);
    // }

    // postInitialPieces(password: number): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/initial-data', password);
    // }

    // postSelectedPieces(request: PieceRequest): Observable<CalculatedData[]> {
    //     return this.http.post<CalculatedData[]>('https://gungi-backend.onrender.com/game/select-data', request);
    // }

    // postSelectedCell(movePiece: MovePieceRequest): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/next-data', movePiece);
    // }

    // postClickedBoardReset(password: number): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/boardreset-data', password);
    // }

    // postClickedReplay(replayRequest: ReplayRequest): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/replay-data', replayRequest);
    // }

    // postClickedGiveUp(password: number): Observable<MoveResult> {
    //     return this.http.post<MoveResult>('https://gungi-backend.onrender.com/game/give-data', password);
    // }

    // postClickedGameEnd(password: number): Observable<boolean> {
    //     return this.http.post<boolean>('https://gungi-backend.onrender.com/game/end-data', password)
    // }
}