import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {

  selectedFile: File | null = null;

  public signUpForm: FormGroup = new FormGroup({
    'userName': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
    'eMail': new FormControl("", Validators.required),
    // 'userimageName': new FormControl("", Validators.required),
  });

  constructor(public _usersService: UsersService, private router: Router) { }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  signingUp() {
    console.log(this.signUpForm.value);
    const uploadData = new FormData();
    if (this.selectedFile) {
      uploadData.append('image', this.selectedFile, this.selectedFile.name);
    }
    uploadData.append('userName', this.signUpForm.get('userName')!.value);
    uploadData.append('eMail', this.signUpForm.get('eMail')!.value);
    uploadData.append('password', this.signUpForm.get('password')!.value);
    this._usersService.singingUp(uploadData).subscribe({
      next: (res) => {
        console.log(res);
        // localStorage.setItem("userId", res.id);
        // this.router.navigate(["?"]);

      },
      error: (err) => {
        console.log(err);

      }
    })
    this.goToAccount();
  }
  goToAccount() {
    this.router.navigate(['/home-page']);
  }

}
