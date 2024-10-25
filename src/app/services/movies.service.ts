import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iMovie } from '../interfaces/i-movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl: string = environment.moviesUrl;
  favouritesUrl: string = environment.favouritesUrl;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.moviesUrl);
  }

  addFavouriteMovie(newFavourite: Partial<iMovie>) {
    return this.http.post<iMovie>(this.favouritesUrl, newFavourite); //rotta endpoint con user name
  }
}
