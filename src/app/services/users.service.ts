import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import SignIn from '../models/signIn.model';
import SignUp from '../models/signUp.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  
  getUsers() {
    return this.http.get('/api/users');
  }

  //הוספתי פונקציה כדי לשלוח נתוני SIGNIN
  signingIn(signIn: SignIn): Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/users/signIn',signIn);
  }

  singingUp(signUp:FormData) : Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/users/signUp',signUp);
  }

  getThoughtsByUserId(userId: Number): Observable<any>{
    return this.http.get<any>(`GET http://localhost:8080/api/thoughts/getThoughtsByUserId/${userId}`);
  }
  
}
