import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Age } from '../models/age.model';

@Injectable({
  providedIn: 'root'
})
export class AgeService {
  
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/ages';

   getAges(): Observable<Age[]> {
    return this.http.get<Age[]>(`${this.baseUrl}/getAges`);
  }
}
