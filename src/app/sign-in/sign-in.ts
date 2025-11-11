import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class SignIn implements OnInit {

  public signInForm: FormGroup = new FormGroup({
    'password': new FormControl("", Validators.required),
    'eMail': new FormControl("", Validators.required)
  })

  constructor(public _usersService: UsersService, private router: Router) { }
  ngOnInit(): void { }

  signingIn() {
    console.log(this.signInForm.value);
    this._usersService.signingIn(this.signInForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // alert("התחברת בהצלחה!");
        localStorage.setItem("userId", res);
        this.router.navigate(["/"]);
      },
      error: (err) => {
        console.log(err);
        // alert("אימייל או סיסמה שגויים, נסה שוב.");
      }
    })

  }


}
