import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {


  constructor(private http: HttpClient) { }
   private baseUrl = 'http://localhost:8080/api/categories';
  
     getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.baseUrl}/getAllCategories`);
    }
}
