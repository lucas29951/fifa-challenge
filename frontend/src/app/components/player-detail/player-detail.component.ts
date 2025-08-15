import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  player: any;
  genero!: string;
  id!: number;
  loading = true;
  error: string | null = null;

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } }
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid: { color: 'rgba(255,255,255,0.2)' },
        pointLabels: { color: 'white' },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  radarChartLabels: string[] = ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'];

  radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: [],
        label: 'Skills',
        backgroundColor: 'rgba(102,191,255,0.4)',
        borderColor: 'rgba(102,191,255,1)',
        pointBackgroundColor: 'rgba(102,191,255,1)'
      }
    ]
  };

  radarChartType: ChartType = 'radar';

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

        this.radarChartData.datasets[0].data = [
          data.pace || 0,
          data.shooting || 0,
          data.passing || 0,
          data.dribbling || 0,
          data.defending || 0,
          data.physic || 0
        ];
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
