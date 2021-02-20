import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public router: Router, // You have to add this line to be able to use 'router'
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']); // routes to the 'movie-card' view
    this.snackBar.open("You've been logged out", 'OK', {
      duration: 2000,
    });
  }
}
