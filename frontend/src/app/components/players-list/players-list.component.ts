import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css'
})
export class PlayersListComponent implements OnInit {
  @Input() players: Player[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 10;

  constructor(
    private playerService: PlayerService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores() {
    forkJoin({
      males: this.playerService.getMalePlayers(this.currentPage, this.limit),
      females: this.playerService.getFemalePlayers(this.currentPage, this.limit)
    }).subscribe(({ males, females }) => {
      this.players = [
        ...males.map(player => ({ ...player, genre: 'male' })),
        ...females.map(player => ({ ...player, genre: 'female' }))
      ];
      this.players.sort((a,b) => a.long_name.localeCompare(b.long_name));
      this.totalPages = Math.ceil(this.players.length / this.limit);
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarJugadores();
    }
  }
}
