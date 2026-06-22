import {HttpErrorResponse, HttpInterceptor, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthorizationService} from '../service/authorization.service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authorizationInterceptor: HttpInterceptorFn = (request, next) => {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  const router: Router = inject(Router);
  const accessToken: string | null  = authorizationService.getAccessToken();


  const authorizedRequest = accessToken ?
    request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }})
  : request;

  return next(authorizedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authorizationService.clearAccessToken();
        void router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
}
