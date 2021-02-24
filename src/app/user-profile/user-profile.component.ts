import { Component, OnInit } from '@angular/core';
import {
  GetAllMoviesService,
  GetUserService,
  DeleteFavoriteMovieService,
  DeleteUserService,
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    public fetchApiData3: DeleteFavoriteMovieService,
    public fetchApiData4: DeleteUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  /**
   * Runs the getUser() function on initialization
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets the user object from the database on initialization
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }

  /**
   * Gets a list of all movies from the database
   */
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  /**
   * Filters the list of movies into an array that matches the users favorites
   * @returns {array}
   */
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favorites;
  }

  /**
   * Removes movies from the users favorites list
   */
  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteFavoriteMovie(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} removed from your Favorites. Refresh to see changes.`,
        'OK',
        {
          duration: 2000,
        }
      );
    });
  }

  /**
   * Opens a dialog box for the user to update their user details
   */
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileComponent, {
      width: '280px',
    });
  }

  /**
   * Deletes the user profile
   */
  deleteProfile(): void {
    this.fetchApiData4.deleteUser().subscribe((resp: any) => {
      console.log('profile deleted');
      localStorage.clear();
      this.router.navigate(['welcome']); // routes to the 'welcome' view
      this.snackBar.open('Profile Deleted', 'OK', {
        duration: 2000,
      });
    });
  }
}
