import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Use this to close the dialog on success
import {
  FetchApiDataService,
  UserLoginService,
} from '../fetch-api-data.service'; // This imports in the API calls from the 'fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'; // This import is used to display notifications back to the user
import { Router } from '@angular/router'; // Allows for routing

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router // You have to add this line to be able to use 'router'
  ) {}

  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend when the user logs in
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result: any) => {
        this.dialogRef.close(); // Closes the modal on success
        // Add the username and token to localStorage here
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']); // routes to the 'movie-card' view
      },
      (result: any) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
