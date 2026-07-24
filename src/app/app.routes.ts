import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RuleComponent } from './rule/rule.component';
import { ReserveComponent } from './reserve/reserve.component';
import { GameComponent } from './game/game.component';

// ルーティング設定
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'rule', component: RuleComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'game', component: GameComponent }
];
