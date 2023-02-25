import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  busyRequestCount = 0;
  private loading: boolean = false;
  constructor(private spinnerService: NgxSpinnerService) { }

  Load(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined,{
      type:'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#772953',
      fullScreen: true
    })
  //   this.busyRequestCount++;
  //   this.spinnerService.show(undefined, { fullScreen: true });
  }

  showSpinner() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, { fullScreen: true });
  }



  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
