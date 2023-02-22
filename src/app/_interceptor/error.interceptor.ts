import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toaster: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400: 
              if(error.error.errors){
                const modelStateErros = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modelStateErros.push(error.error.errors[key]);
                  }
                }
                throw modelStateErros.flat();
              }else{
                this.toaster.error(error.error, error.status.toString());
              }
              break;
            case 401:
              this.toaster.error(error.error, error.status.toString());
              break;
            case 404:
              this.route.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.route.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toaster.error(error.error, error.status.toString());
              break;
          }
        }
        throw error;
      }))
  }
}
