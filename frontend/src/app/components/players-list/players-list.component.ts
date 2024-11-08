import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css'
})
export class PlayersListComponent implements OnInit {
  @Input() players: Player[] = [];

  constructor(private playerService: PlayerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores() {
    this.playerService.getMalePlayers().subscribe(data => {
      this.players = data;
    });
  }
}
