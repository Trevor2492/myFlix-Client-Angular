import { Component, OnInit, Input } from '@angular/core';

// Use this to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This imports in the API calls from the 'fetch-api-data.service'
import {
  FetchApiDataService,
  UserRegistrationService,
} from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        // Logic for a successful user registration goes here!
        this.dialogRef.close(); // Closes the modal on success
        console.log(result);
        this.snackBar.open('Registration Successful', 'OK', {
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
