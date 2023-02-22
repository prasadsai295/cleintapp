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
  validateErrors = [];

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
        this.validateErrors = error;
      }
    })
  }

  cancel(){
    this.toastr.warning('cancel registe....');
    this.cancelRegister.emit(false);
  }
}
