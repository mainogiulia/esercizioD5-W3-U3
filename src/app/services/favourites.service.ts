import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of, switchMap } from 'rxjs';
import { iMovie } from '../interfaces/i-movie';
import { iUser } from '../interfaces/i-user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  currentUser: iUser | null = null;
  favouritesUrl: string = environment.favouritesUrl;

  constructor(private http: HttpClient, private authSvc: AuthService) {}

  // getFavouriteMovies(): Observable<iMovie[]> {
  //   return this.http.get<iMovie[]>(this.favouritesUrl);
  // }

  // getFavouriteMovies(): Observable<iMovie[]> {
  //   this.authSvc.user$.subscribe((user) => {
  //     this.currentUser = user;
  //     if (user) {
  //       return this.http.get<iMovie[]>('${this.favouritesUrl}'/'${user.name}');
  //     }
  //   });
  // }

  getFavouriteMovies(): Observable<iMovie[]> {
    return this.authSvc.user$.pipe(
      switchMap((user) => {
        if (user) {
          const url = `${this.favouritesUrl}/${user.name}`;
          return this.http.get<iMovie[]>(url);
        } else {
          // Handle case where user is not logged in
          return of([]); // Return an empty observable
        }
      })
    );
  }
}
