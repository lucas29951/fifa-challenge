import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/Player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/players';
  private apiMale = 'http://localhost:3000/api/players/male';

  constructor(private http:HttpClient) { }

  getMalePlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/male/pagination?page=1&limit=10`);
  }

  getFemalePlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/female/pagination?page=1&limit=10`);
  }

  getJugadores(genero: string): Observable<Player[]> {
    const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player[]>(`${url}/last-version`);
  }

  getJugadorById(genero: string, id: number): Observable<Player> {
    // const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player>(`${this.apiUrl}/${genero}/id/${id}`);
  }

  getJugadoresPorClub(genero: string, club: string): Observable<Player[]> {
    const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player[]>(`${url}/club/${club}`);
  }

  getJugadoresPorPais(genero: string, pais: string): Observable<Player[]> {
    const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player[]>(`${url}/country/${pais}`);
  }

  updateJugador(genero: string, id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${genero}/${id}`, data);
  }
}
