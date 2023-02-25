import { Component, OnInit } from '@angular/core';
import { LoginResponse } from './models/loginResponse';
import { AccountService } from './services/account.service';
import { LoadService } from './services/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  constructor(private accountService: AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: LoginResponse = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
