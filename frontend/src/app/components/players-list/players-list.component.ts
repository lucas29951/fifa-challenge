import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css'
})
export class PlayersListComponent implements OnInit {
  players: Player[] = [];
  // genero: 'hombres' | 'mujeres';
  genero: string = '';

  constructor(private playerService: PlayerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.genero = params.get('genero') as 'hombres' | 'mujeres';
      this.cargarJugadores();
    });
  }

  cargarJugadores() {
    this.playerService.getJugadores(this.genero).subscribe(jugadores => {
      this.players = jugadores;
    });
  }
}
