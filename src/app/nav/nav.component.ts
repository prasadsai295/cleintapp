import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {};
  name: any;
  // currentUser: Observable<LoginResponse | null> = of(null);
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: res => 
      {
          this.name = res?.userName;
      },
      error: error => console.log(error)
    });
  }
 
  login(){
    this.accountService.login(this.model).subscribe({
      next: res => res,
      error: error => console.log(error),
      complete: () => console.log('completed login successfully') 
     })
  }
  
  logout(){
    this.accountService.logout();
  }

}
