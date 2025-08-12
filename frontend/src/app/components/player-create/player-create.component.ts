import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.css'
})
export class PlayerCreateComponent {
  player: any = {
    genero: 'hombre',
    long_name: '',
    player_positions: '',
    club_name: '',
    nationality_name: '',
    overall: null,
    age: null,
    pace: null,
    shooting: null,
    passing: null,
    dribbling: null,
    defending: null,
    physic: null
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
    this.playerService.createPlayer(this.player).subscribe({
      next: (res) => {
        this.saving = false;
        const nuevo = res.jugador;
        console.log("Nuevo: ", nuevo);
        if (nuevo && nuevo.id) {
          this.router.navigate([`/${nuevo.genre}/${nuevo.id}`]);
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
