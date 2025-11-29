import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

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
    'email': new FormControl("", Validators.required)
  })

  constructor(public _usersService: UsersService, private router: Router) { }
  ngOnInit(): void { }

  signingIn() {
    console.log(this.signInForm.value);
    this._usersService.signingIn(this.signInForm.value).subscribe({
      next: (res) => {
        console.log(res);
         alert("התחברת בהצלחה!");
        localStorage.setItem("userId",res.id );
        this.router.navigate(["/my-account"]);
      },
      error: (err) => {
        console.log(err);
        console.log("no no no");
        
        // alert("אימייל או סיסמה שגויים, נסה שוב.");
      }
    })

  }


}
