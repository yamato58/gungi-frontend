import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RuleComponent } from './rule/rule.component';
import { GameComponent } from './game/game.component';

// ルーティング設定
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'rule', component: RuleComponent },
    { path: 'game', component: GameComponent }
];
