import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import {  FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { LoginResponse } from 'src/app/models/loginResponse';
import { AccountService } from 'src/app/services/account.service';
import { map, take } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  uploader:FileUploader | undefined;
  hasBaseDropZoneOver =false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: LoginResponse | undefined;

  @Input() member: Member | undefined;
  constructor(private accountService: AccountService, private memberService: MemberService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {if(user) this.user = user;}
    })
  }

  ngOnInit(): void {
    this.intializeUploader();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  intializeUploader(){
    this.uploader = new FileUploader({
      url: `${this.baseUrl}user/add-photo`,
      authToken: `Bearer ${this.user?.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*2024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, resonse,status, headers) => {
      if(resonse){
        const photo = JSON.parse(resonse);
        this.member?.photos.push(photo);
        if(photo.isMain && this.member && this.user){
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photoId: number){
    this.memberService.setMainPhoto(photoId).subscribe({
      next: () => {
        if(this.member){
          this.member.photos = this.member.photos.filter(x => x.id != photoId);
        }
      }
    })

  }
}
