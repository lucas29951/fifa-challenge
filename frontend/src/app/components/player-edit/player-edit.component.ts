import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent implements OnInit {
  player: any = {};
  genero!: string;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private playerService : PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.genero = this.route.snapshot.paramMap.get('genre') as 'male' | 'female';
      this.id = +this.route.snapshot.paramMap.get('id')!;

      this.playerService.getJugadorById(this.genero, this.id).subscribe(data => {
        this.player = data;
      });
  }

  onSubmit(): void {
    this.playerService.updateJugador(this.genero, this.id, this.player).subscribe(() => {
      alert('Jugador actualizado correctamente!');
      this.router.navigate(['/players']);
    });
  }
}
