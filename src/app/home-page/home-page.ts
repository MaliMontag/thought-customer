import { Component } from '@angular/core';
import { ThoughtService } from '../services/thought.service';
import { Thought } from '../models/thought.model';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

listOfThoughts:Thought[]=[];

  constructor(private service:ThoughtService) {
    this.service.getThoughts().subscribe(data=>{
      console.log(data);
      //לברר שהתחביר נכון
      this.listOfThoughts=data as Thought[];
    }
    );
  }
}
