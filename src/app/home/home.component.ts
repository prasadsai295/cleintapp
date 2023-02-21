import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getusers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getusers(){
    this.http.get('https://localhost:5001/myapp/api/v1/user')
    .subscribe({
      next: res => {
        this.users = res; 
      },
      error: error => console.log(error) 
    });
  }

  cancelRegister(event: boolean){
    this.registerMode = event;
  }

}
