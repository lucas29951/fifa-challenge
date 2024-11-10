import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  player: Player | null = null;

  constructor(private playerService: PlayerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const genre = this.route.snapshot.paramMap.get('genre') as 'male' | 'female';

    this.playerService.getJugadorById(genre, id).subscribe(data => {
      this.player = data;
    });
  }
}
