import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.css',
})
export class SignOut {
  constructor(private _usersService: UsersService, private _router: Router) { }

id:number = Number(localStorage.getItem("userId"));

  signingOut(): void {
    this._usersService.signingOut(this.id).subscribe({
      next: (res) => {
        console.log("Signed out successfully", res);
        localStorage.removeItem("userId");
        this._router.navigate(['/home-page']);
      },
      error: (err) => {
        console.log("Error signing out", err);
      }
    });
  }
}