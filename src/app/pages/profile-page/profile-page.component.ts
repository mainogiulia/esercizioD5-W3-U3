import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
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
  users: iUser[] = [];

  constructor(
    private favSvc: FavouritesService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.favSvc.getFavouriteMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
}
