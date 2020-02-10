import { Injectable } from '@angular/core';

// Import du model Song
import { Song } from '../model/song';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  httpOptions = {
    headers: new HttpHeaders({'Contet-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  // Méthode d'ajout de musique
  addSong(song: Song): Observable<any> {
    return this.http.post<Song>('http://localhost:3000/api/create-song', song, this.httpOptions)
      .pipe(catchError(this.handleError<Song>('Add Song')));
  }

  // Méthode pour récupérer une musique via son id
  getSong(id): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api/get-song/' + id)
      .pipe(
        tap(_ => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Song[]>(`Get Song id=${id}`))
      );
  }

  // Méthode pour récupérer une liste de musique
  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api')
      .pipe(
        tap(songs => console.log('Songs fetched!')),
        catchError(this.handleError<Song[]>('Get Songs', []))
      );
  }

  // Méthode de mise à jour de musique via son id
  updateSong(id, song: Song): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-song/' + id, song, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song updated: ${id}`)),
        catchError(this.handleError<Song[]>('Update Song'))
      );
  }

  // Méthode de suppression de musique via son id
  deleteSong(id): Observable<Song[]> {
    return this.http.delete<Song[]>('http://localhost:3000/api/delete-song/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song deleted: ${id}`)),
        catchError(this.handleError<Song[]>('Delete Song'))
      );
  }

  // Affichage des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
