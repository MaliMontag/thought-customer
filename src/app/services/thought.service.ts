import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {
  constructor(private http: HttpClient) { }

  //לבדוק בJAVA את הניתוב
  getThoughts() {
    return this.http.get('/api/thoughts');
  }
}
