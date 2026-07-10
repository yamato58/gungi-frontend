import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';
import { CalculatedData } from '../models/calculatedData.model';
import { MovePiece } from '../models/movePiece.model';
import { MoveResult } from '../models/MoveResult.model';

// サービスをアプリケーション全体で共有し、自動的に依存性注入
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    // HttpClient(getやpostをするのに必要な機能)の注入
    private http = inject(HttpClient);
    const apiUrl = 'https://gungi-backend.onrender.com';
    
    // C#側にリクエスト
    getInitialPieces(): Observable<MoveResult> {
        return this.http.get<MoveResult>('${apiUrl}/game/initial-data');
    }

    postSelectedPieces(postdata: Piece): Observable<CalculatedData[]> {
        return this.http.post<CalculatedData[]>('${apiUrl}/game/select-data', postdata);
    }

    postSelectedCell(movePiece: MovePiece): Observable<MoveResult> {
        return this.http.post<MoveResult>('${apiUrl}/game/next-data', movePiece);
    }

    postClickedBoardReset(): Observable<MoveResult> {
        return this.http.post<MoveResult>('${apiUrl}/game/boardreset-data', null);
    }

    postClickedCellReset(): Observable<CalculatedData[]> {
        return this.http.post<CalculatedData[]>('${apiUrl}/game/cellreset-data', null);
    }
}
