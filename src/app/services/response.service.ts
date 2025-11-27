import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '../models/responses.model';
// מה נכון?
// import { Observable } from 'rxjs/internal/Observable';
 import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private http:HttpClient){}
  private baseUrl = 'http://localhost:8080/api/responses';

  uploadResponse(responseData: Responses): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadResponse`, responseData, { withCredentials: true });
  }
}
