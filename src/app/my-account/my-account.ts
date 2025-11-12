import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Thought } from '../models/thought.model';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Users } from '../models/users.model';
@Component({
  selector: 'app-my-account',
  imports: [RouterModule, CommonModule],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router) { }

  user: Users | null = null;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userIdString=localStorage.getItem('userId');
      if(userIdString){
        const userId=+userIdString;
        this._usersService.getUserById(userId).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
      }
      else{
        console.warn('User ID not found in local storage. Redirecting to sign in.');
      this.router.navigate(['/signIn']);
      }
    })
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
