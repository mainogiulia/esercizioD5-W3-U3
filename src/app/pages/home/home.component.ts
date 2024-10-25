import { Component } from '@angular/core';
import { iMovie } from '../../interfaces/i-movie';
import { MoviesService } from '../../services/movies.service';
import { map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies: iMovie[] = [];

  constructor(private moviesSvc: MoviesService, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.moviesSvc.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  addfavourite(movie: iMovie) {
    this.authSvc.user$.pipe(map((user) => user?.name)).subscribe((userName) => {
      const newFavorite = {
        ...movie,
        userName,
      };

      this.moviesSvc.addFavouriteMovie(newFavorite).subscribe();
    });
  }
}
