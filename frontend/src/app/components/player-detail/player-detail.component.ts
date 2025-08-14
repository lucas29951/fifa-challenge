import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  player: any;
  genero!: string;
  id!: number;
  loading = true;
  error: string | null = null;

  constructor(
    private playerService: PlayerService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.genero = this.route.snapshot.paramMap.get('genre') as 'male' | 'female';

    this.playerService.getJugadorById(this.genero, this.id).subscribe({
      next: (data) => {
        this.player = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error al cargar jugador';
        this.loading = false;
      }
    });
  }

  editarJugador(): void {
    this.router.navigate([`/player/${this.genero}/${this.id}/edit`]);
  }

  eliminar() {
    if (confirm(`¿Seguro que quiere eliminar a ${this.player?.long_name}?`)) {
      this.playerService.deletePlayer(this.genero, this.id.toString()).subscribe({
        next: () => {
          alert('Jugador eliminado con exito!');
          this.router.navigate(['/players']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Error al eliminar jugador');
        }
      });
    }
  }
}
