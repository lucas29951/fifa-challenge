import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersListComponent },
    { path: 'player/:genre/:id', component: PlayerDetailComponent },
    { path: 'player/:genre/:id/edit', component: PlayerEditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
