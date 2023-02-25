import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { LoginResponse } from 'src/app/models/loginResponse';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editMember') editMember: NgForm | undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editMember?.dirty){
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: LoginResponse | null = null;
  constructor(private accountService: AccountService, private memberService: MemberService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next: member => this.member = member
    });
  }

  updateMember(){
    this.memberService.updateMember(this.editMember?.value).subscribe({
      next: (res) => {
        this.toastr.success('Member updated successfully');
        this.editMember?.reset(this.member);
      }
    });
  }

}
