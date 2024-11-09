import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersListComponent },
    // { path: 'player/:genero/:id', component: PlayerDetailComponent }
];
