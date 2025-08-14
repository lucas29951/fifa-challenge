import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/Player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/players';

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

  getFilteredPlayers(genre: string, position?: string, nationality?: string, club?: string) {
    let params: any = { genre };
    if (position) params.position = position;
    if (nationality) params.nationality = nationality;
    if (club) params.club = club;

    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params });
  }

  createPlayer(player: Player) {
    return this.http.post<Player>(`${this.apiUrl}/${player.genre}/`, player);
  }

  searchPlayers(query: string, genero: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/${genero}/search?name=${query}`);
  }

  deletePlayer(genero: string, id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${genero}/id/${id}`);
  }
}
