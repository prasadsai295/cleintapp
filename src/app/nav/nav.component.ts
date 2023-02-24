import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService: AccountService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    console.log(this.accountService.currentUser$);
    this.accountService.currentUser$.subscribe({
      next: res => 
      {
          this.name = res?.userName;
          this.router.navigateByUrl('/');
      },
      error: error => console.log(error)
    });
  }
 
  login(){
    this.accountService.login(this.model).subscribe({
      next: res => {
        this.toast.success('login user successfully.');
        this.model = {};
        this.router.navigateByUrl('/members');
      }
     })
  }
  
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
