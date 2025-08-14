import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { Player } from '../../models/Player.model';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.css'
})
export class PlayerCreateComponent {
  player: Player = {
    genre: 'male',
    long_name: '',
    player_positions: '',
    club_name: '',
    nationality_name: '',
    overall: 0,
    age: 0,
    pace: 0,
    shooting: 0,
    passing: 0,
    dribbling: 0,
    defending: 0,
    physic: 0,
    fifa_version: '',
    fifa_update: '',
    player_face_url: '',
    potential: 0,
    id: 0
  };

  saving = false;
  error: string | null = null;

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  crear() {
    this.saving = true;
    this.error = null;
    console.log('Player: ', this.player);
    this.playerService.createPlayer(this.player).subscribe({
      next: (res) => {
        this.saving = false;
        const nuevo = res;
        console.log("Nuevo: ", nuevo);
        if (nuevo && nuevo.id) {
          this.router.navigate([`/player/${this.player.genre}/${nuevo.id}`]);
        } else {
          this.router.navigate(['/players']);
        }
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.message || 'Error creando jugador';
      }
    });
  }
}
