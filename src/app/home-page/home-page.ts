import { Component, OnInit } from '@angular/core';
import { ThoughtService } from '../services/thought.service';
import { Thought } from '../models/thought.model';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

listOfThoughts:Thought[]=[];

  constructor(private service:ThoughtService) {}


  ngOnInit(): void {
    this.service.getThoughts().subscribe({
      next: (data) => {
        this.listOfThoughts = data;
      },
      error: (err) => {
        console.error('Error fetching thoughts', err);
      }
    });
  }
}
