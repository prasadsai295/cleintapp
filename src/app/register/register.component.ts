import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
     
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.toastr.success('User registed!.....');
        this.cancel();
      },
      error: error => {
        debugger;
        if(error.error?.errors?.count )
        console.log(error);
      }
    })
  }

  cancel(){
    this.toastr.warning('cancel registe....');
    this.cancelRegister.emit(false);
  }
}
