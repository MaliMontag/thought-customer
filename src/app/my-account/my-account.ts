import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Thought } from '../models/thought.model';
import { Router,RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {

  constructor(private _usersService: UsersService, private router: Router,private sanitizer: DomSanitizer) { }

  userId: Number | null = null;
  userThoughts: any[] = [];
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userName"));
    this._usersService.getThoughtsByUserId(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userThoughts = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

   //פונקצית מעבר להגיג ספציפי
    showDetails(thought: Thought) {
      this.router.navigate(['/thoughtDetails', thought.id])
    }

    //פונקצית המרת התמונה
  getImageUrl(base64Image: string): SafeUrl {
    const fullUrl = 'data:image/jpeg;base64,' + base64Image;
    // חובה לעקוף את מנגנון האבטחה של Angular (DomSanitizer) עבור Data URIs
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
