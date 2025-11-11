import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from "@angular/router";
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  constructor(private router: Router) { }
  
  goToHome() {
    this.router.navigate(['/']);
  }
}
