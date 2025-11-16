import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Thought } from '../models/thought.model';

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
    return this.http.get<Thought[]>(`${this.baseUrl}/getThoughtsByUserI/${userId}`);
  }

  uploadingThought(thoughtData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadThought`, thoughtData, { withCredentials: true });
  }

}
