import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.html',
  styleUrl: './sign-out.css',
})
export class SignOut {
  constructor(private _usersService: UsersService) { }

id:number = Number(localStorage.getItem("userId"));

  signingOut(): void {
    this._usersService.signingOut(this.id).subscribe({
      next: (res) => {
        console.log("Signed out successfully", res);
      },
      error: (err) => {
        console.log("Error signing out", err);
      }
    });
  }
}