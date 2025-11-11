import { Component, OnInit } from '@angular/core';
import { ThoughtService } from '../services/thought.service';
import { Thought } from '../models/thought.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  listOfThoughts: Thought[] = [];

  constructor(private service: ThoughtService, private sanitizer: DomSanitizer, private router: Router) { }

    //פונקצית הבאת כל הנתונים מהשרת
  ngOnInit(): void {
    this.service.getThoughts().subscribe({
      next: (data) => {
        this.listOfThoughts = data;
      },
      // error: (err) => {
      //   console.error('Error fetching thoughts', err);
      // }
    });
  }

  //פונקצית המרת התמונה
  getImageUrl(base64Image: string): SafeUrl {
    const fullUrl = 'data:image/jpeg;base64,' + base64Image;
    // חובה לעקוף את מנגנון האבטחה של Angular (DomSanitizer) עבור Data URIs
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }

  //פונקצית מעבר להגיג ספציפי
  showDetails(thought: Thought) {
    this.router.navigate(['/thoughtDetails', thought.id])
  }

  signingIn() {
    this.router.navigate(['/sign-in']);
  }

  signingUp() {
    this.router.navigate(['/sign-up']);
  }
}
