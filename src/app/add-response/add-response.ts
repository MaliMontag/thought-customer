import { Component } from '@angular/core';
import { Responses } from '../models/responses.model';
import { FormGroup, FormsModule } from '@angular/forms';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-add-response',
  imports: [FormsModule],
  templateUrl: './add-response.html',
  styleUrl: './add-response.css',
})
export class AddResponse {
  response!: Responses;
  content: string = '';
constructor(private responseService:ResponseService){}
  ngOnInit(): void {
   this.response=new Responses();
  }

  sendResponse(): void {
    this.response.content=this.content;
    this.response.date=new Date();
    this.response.thought.id=Number(localStorage.getItem("thoughtId"));
    this.response.user.id=Number(localStorage.getItem("userId"));
    this.responseService.uploadResponse(this.response).subscribe({
      next: (res) => {
        console.log('Response uploaded successfully:', res);
        alert("Response uploaded successfully");
      },
      error: (err) => {
        console.error('Error uploading response:', err);
        alert("Error uploading response");
      }
    })
  }

}
