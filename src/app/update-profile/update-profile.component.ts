import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public snackBar: MatSnackBar,
    public fetchApiData: EditUserService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>
  ) {}

  ngOnInit(): void {}

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result: any) => {
        // Logic for a successful user edit goes here!
        this.dialogRef.close(); // Closes the modal on success
        localStorage.setItem('user', result.Username);
        console.log(result);
        console.log('success');
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
