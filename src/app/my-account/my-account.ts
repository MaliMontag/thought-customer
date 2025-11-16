import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Thought } from '../models/thought.model';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Users } from '../models/users.model';
import { ThoughtService } from '../services/thought.service';

@Component({
  selector: 'app-my-account',
  imports: [RouterModule, CommonModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {
  user: Users | null = null;
  myThoughts: Thought[] = [];
  userId: number | null = null;
  constructor(
    private _usersService: UsersService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef, private thoughtService: ThoughtService) {

  }


  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    console.log(userIdString);

    if (userIdString) {
      this.userId = +userIdString;
      this._usersService.getUserById(this.userId).subscribe(
        {
          next: (res) => {
            this.user = res;
            console.log(this.user?.userName);
            //          this.cdr.detectChanges();
          },
          error: (err) => {
            console.log(err);
          }
        });
      this.getMyThoughts(this.userId);

    }
    else {
      console.warn('User ID not found in local storage. Redirecting to sign in.');
      this.router.navigate(['/signIn']);
    }
  }

  getMyThoughts(userId: number) {
    this.thoughtService.getThoughtByUserId(userId).subscribe(
      {
        next: (res) => {
          this.myThoughts = res;
          console.log(this.myThoughts);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }


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
