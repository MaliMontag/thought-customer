import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Thought } from '../models/thought.model';
import { map, catchError } from 'rxjs/operators';
import { ChatRequest } from '../models/chatRequest';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private baseUrl = 'http://localhost:8080/api/thoughts';

  constructor(private http: HttpClient) { }

  //שיניתי את הפונקציה לאובסרביבל
  //לבדוק בJAVA את הניתוב
  getThoughts(): Observable<Thought[]> {
    return this.http.get<Thought[]>(`${this.baseUrl}/getAllThoughts`);
  }

  getThoughtById(id: number): Observable<Thought> {
    return this.http.get<Thought>(`${this.baseUrl}/getThought/${id}`);
  }
  getThoughtByUserId(userId: number): Observable<Thought[]> {
    return this.http.get<Thought[]>(`${this.baseUrl}/getThoughtsByUserId/${userId}`);
  }

  uploadingThought(thought: Thought): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadThought`, thought, { withCredentials: true });
  }

  sendChatRequest(message:string, conversationId:string): Observable<string> {
    const body: ChatRequest = {message, conversationId};
    return this.http.post(`${this.baseUrl}/chat`, body, { withCredentials: true,
        responseType: 'text'})
      .pipe(
        catchError(err => {
          console.error('Error occurred while sending chat request:', err);
          return of('Sorry, something went wrong. Please try again later.');
        })
      ) as Observable<string>;
  }

}
