import { Component, OnInit, Input } from '@angular/core';

// Use this to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This imports in the API calls from the 'fetch-api-data.service'
import {
  FetchApiDataService,
  UserLoginService,
} from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result: any) => {
        // Logic for a successful user login goes here!
        this.dialogRef.close(); // Closes the modal on success
        console.log(result);
        // Add the username and token to localStorage here
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result: any) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
