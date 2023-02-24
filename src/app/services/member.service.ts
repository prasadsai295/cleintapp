import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // getHttpOptions(){
  //   const userItem = localStorage.getItem('user');
  //   if(!userItem)return;
  //   const user = JSON.parse(userItem);
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer '+ user.token 
  //     })
  //   }
  // }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'user');
  }

  getMember(username:string){
    return this.http.get<Member>(`${this.baseUrl}user/${username}/user`);
  }

  
}
