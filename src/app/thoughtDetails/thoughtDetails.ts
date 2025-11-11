import { Component, OnInit } from '@angular/core';
import { Thought } from '../models/thought.model';
import { ThoughtService } from '../services/thought.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-thought-details',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './thoughtDetails.html',
  styleUrl: './thoughtDetails.css',
})
export class ThoughtDetails implements OnInit {

  constructor(private _thoughtService: ThoughtService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  thought!: Thought;

//פונקציה המקבלת את ההגיג לי איידי מהשרת
  ngOnInit(): void {
    var id: number;
    this.route.params.subscribe((params) => {
      id = params['id']
      this._thoughtService.getThoughtById(id).subscribe({
        next: (res) => {
          this.thought = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

    //פונקצית המרת התמונה
  getImageUrl(base64Image: string): SafeUrl {
    const fullUrl = 'data:image/jpeg;base64,' + base64Image;
    // חובה לעקוף את מנגנון האבטחה של Angular (DomSanitizer) עבור Data URIs
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
}
