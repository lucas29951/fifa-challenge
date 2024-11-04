import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  jugador!: Player;
  // genero: 'hombres' | 'mujeres';
  genero: string = '';

  constructor(private playerService: PlayerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id =+! this.route.snapshot.paramMap.get('id');
    this.genero = this.route.snapshot.paramMap.get('genero') as 'hombres' | 'mujeres';
    this.playerService.getJugadorById(this.genero, id).subscribe(jugador => {
      this.jugador = jugador;
    });
  }
}
