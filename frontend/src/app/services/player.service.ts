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

  getMalePlayers(page: number, limit: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/male/pagination?page=${page}&limit=${limit}`);
  }

  getFemalePlayers(page: number, limit: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/female/pagination?page=${page}&limit=${limit}`);
  }

  getJugadores(genero: string): Observable<Player[]> {
    const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player[]>(`${url}/last-version`);
  }

  getJugadorById(genero: string, id: number): Observable<Player> {
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

  getJugadoresDestacados(genero: string): Observable<Player[]> {
    const url = genero === 'hombres' ? this.apiUrl+'/male' : this.apiUrl+'/female';
    return this.http.get<Player[]>(`${url}/highlights`);
  }

  getFilteredPlayers(filters: any) {
    let params: any = {};

    if (filters.gender) params.gender = filters.gender;
    if (filters.club) params.club = filters.club;
    if (filters.country) params.country = filters.country;
    if (filters.minOverall) params.minOverall = filters.minOverall;
    if (filters.maxOverall) params.maxOverall = filters.maxOverall;
    if (filters.position) params.position = filters.position;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;

    return this.http.get<Player[]>(`${this.apiUrl}/${filters.gender}/filter`, { params });
  }

  createPlayer(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  create(player: Player) {
    return this.http.post<Player>(`${this.apiUrl}/${player.genre}/`, player);
  }
}
