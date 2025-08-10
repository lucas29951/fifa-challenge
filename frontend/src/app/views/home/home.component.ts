import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../models/Player.model';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredPlayers: Player[] = [];

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
      forkJoin({
      males: this.playerService.getMalePlayers(1,3),
      females: this.playerService.getFemalePlayers(1,3)
    }).subscribe(({ males, females }) => {
      this.featuredPlayers = [
        ...males.map(player => ({ ...player, genre: 'male' })),
        ...females.map(player => ({ ...player, genre: 'female' }))
      ];
      this.featuredPlayers.sort((a,b) => a.long_name.localeCompare(b.long_name));
    });
  }
}
