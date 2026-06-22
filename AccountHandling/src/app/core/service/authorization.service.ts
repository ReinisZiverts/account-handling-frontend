import {AuthorizationRestService} from './authorization.rest-service';
import {inject, Injectable} from '@angular/core';
import {LoginDto} from '../model/login.dto';
import {catchError, map, Observable, switchMap, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthorizationService {

  private readonly authorizationRestService: AuthorizationRestService = inject(AuthorizationRestService);
  private readonly router: Router = inject(Router);

  setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  logout() {
    this.clearAccessToken();
    void this.router.navigateByUrl("/login");
  }

  clearAccessToken() {
    localStorage.removeItem("accessToken");
  }

  login(login: LoginDto): Observable<void> {
    return this.authorizationRestService.login(login).pipe(
      tap((response) => {
        this.setAccessToken(response.accessToken);
      }),
      map(() => undefined),
      catchError((error) => {
        this.clearAccessToken();
        return throwError(() => error);
      })
    );
  }

}
