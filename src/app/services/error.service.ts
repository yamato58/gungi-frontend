import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';
// import { SelectPiece } from '../models/selectPiece.model';
import { CalculatedData } from '../models/calculatedData.model';
import { MovePiece } from '../models/movePiece.model';

// サービスをアプリケーション全体で共有し、自動的に依存性注入
@Injectable({
    providedIn: 'root'
})

export class ErrorService {

}
