import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService, // GetAllMoviesService is a class found in the fetch-api-data.service.ts file
    public fetchApiData2: AddFavoriteMovieService,
    public fetchApiData3: DeleteFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  // This happens on initialization
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '325px',
    });
  }

  showDirectorDialog(
    name: string,
    image: string,
    bio: string,
    birth: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, image, bio, birth, death },
      width: '325px',
    });
  }

  showDetailsDialog(
    title: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, description, director, genre },
      width: '325px',
    });
  }

  addToFavorites(id: string, title: string): void {
    this.fetchApiData2.addFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} added to your Favorites`, 'OK', {
        duration: 2000,
      });
    });
  }

  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} removed from your Favorites`, 'OK', {
        duration: 2000,
      });
    });
  }
}
