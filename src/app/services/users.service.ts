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

  private baseUrl = 'http://localhost:8080/api/users';
  getUsers() : Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllUsers`, { withCredentials: true });
  }

  //הוספתי פונקציה כדי לשלוח נתוני SIGNIN
  signingIn(signIn: SignIn): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/signIn`,signIn,  { withCredentials: true });
  }

  singingUp(signUp:FormData) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/signUp`,signUp,  { withCredentials: true });
  }

  // getThoughtsByUserId(userId: Number): Observable<any>{
  //   return this.http.get<any>(`GET http://localhost:8080/api/thoughts/getThoughtsByUserId/${userId}`);
  // }

  getUserById(userId: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getUser/${userId}`,  { withCredentials: true });
  }

  //לעשות פונקציה כזו בJAVA
  signingOut(userId: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/signOut`,{userId},  { withCredentials: true });
  }
  
}
