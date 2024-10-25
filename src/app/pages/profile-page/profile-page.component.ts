import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iMovie } from '../../interfaces/i-movie';
import { FavouritesService } from '../../services/favourites.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  movies: iMovie[] = [];
  currentUser: iUser | null = null;

  constructor(
    private favSvc: FavouritesService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.favSvc.getFavouriteMovies().subscribe((movies) => {
          this.movies = movies.filter((movie) => {
            return movie.userName === user.name;
          });
        });
      }
    });
    console.log(this.currentUser);
  }
}
