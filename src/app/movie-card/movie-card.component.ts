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

  /**
   * Runs the getMovies() function on initialization
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Gets a list of all movies and stores them in an array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog box with a desctription of the movies' genre
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '325px',
    });
  }

  /**
   * Opens a dialog box with a description of the movies' director
   */
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

  /**
   * Opens a dialog box with more details about the movie
   */
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

  /**
   * Adds the movie to the users list of favorites which is stored in the database
   */
  addToFavorites(id: string, title: string): void {
    this.fetchApiData2.addFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} added to your Favorites`, 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * removes the movie from the users list of favorites
   */
  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} removed from your Favorites`, 'OK', {
        duration: 2000,
      });
    });
  }
}
