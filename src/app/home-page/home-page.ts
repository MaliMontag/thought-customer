import { Component, OnInit } from '@angular/core';
import { ThoughtService } from '../services/thought.service';
import { Thought } from '../models/thought.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AgeService } from '../services/age.service';
import { Age } from '../models/age.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  listOfThoughts: Thought[] = [];
  displayedThoughts: Thought[] = [];
  categories: Category[] = [];
  ageOptions: Age[] = [];


  constructor(private service: ThoughtService, private sanitizer: DomSanitizer, private router: Router, private _ageService: AgeService, private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.service.getThoughts().subscribe({
      next: (data) => {
        console.log("thoughts came from server");

        this.displayedThoughts = data;
      },
      error: (err) => {
        console.error('Error fetching thoughts', err);
      }
    });
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        console.log("categories came from server");

        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching thoughts', err);
      }
    });
  }

  //פונקצית המרת התמונה
  getImageUrl(base64Image: string): SafeUrl {
    const fullUrl = 'data:image/jpeg;base64,' + base64Image;
    // חובה לעקוף את מנגנון האבטחה של Angular (DomSanitizer) עבור Data URIs
    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }

  filterByCategory(categoryName: string) {
    this.displayedThoughts = this.listOfThoughts.filter(
      t => t.category.categoryName === categoryName
    );
  }



  filterByAge(event: Event) {
    const selectedAge = Number((event.target as HTMLSelectElement).value);
    if (!selectedAge) {
      this.displayedThoughts = this.listOfThoughts;
      return;
    }
    this.displayedThoughts = this.listOfThoughts.filter(t => t.age.id === selectedAge);
  }



  showAll() {
    this.displayedThoughts = this.listOfThoughts;
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

  signingOut() {
    this.router.navigate(['/sign-out']);
  }

  myAccount() {
    this.router.navigate(['/my-account']);
  }

  uploadThought() {
    this.router.navigate(['/upload-thought']);
  }

  // checkLike(){

  // }
}