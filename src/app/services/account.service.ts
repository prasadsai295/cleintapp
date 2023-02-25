import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrlV1 = 'https://localhost:5001/myapp/api/v1/';

  private currentUserSource = new BehaviorSubject<LoginResponse | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  login(model: any){
    return this.httpClient.post<LoginResponse>(this.baseUrlV1+'account/login', model).pipe(
      map((res: any) => {
        const user = res;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any){
    return this.httpClient.post<LoginResponse>(this.baseUrlV1+"account/register", model).pipe(
      map((res: any) => {
        const user = res;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  getUsers(){
    return this.httpClient.get(this.baseUrlV1+'user/server-error');
  }

  setCurrentUser(user: LoginResponse){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
