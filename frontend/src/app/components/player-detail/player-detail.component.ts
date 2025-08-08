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

  constructor(
    private playerService: PlayerService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.genero = this.route.snapshot.paramMap.get('genre') as 'male' | 'female';

    this.playerService.getJugadorById(this.genero, this.id).subscribe(data => {
      this.player = data;
    });
  }

  editarJugador(): void {
    this.router.navigate([`/player/${this.genero}/${this.id}/edit`]);
  }
}
