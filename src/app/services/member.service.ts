import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

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
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'user').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username:string){
    const member = this.members.find(x => x.userName == username);
    if(member) return of(member);
    return this.http.get<Member>(`${this.baseUrl}user/${username}/user`);
  }

  updateMember(member: Member){
    return this.http.put(`${this.baseUrl}user`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members, ...member};
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(`${this.baseUrl}user/set-main-photo/${photoId}`,{});
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${this.baseUrl}user/delete-photo/${photoId}`,{});
  }

  
}
