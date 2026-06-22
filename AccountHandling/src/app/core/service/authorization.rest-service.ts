import {inject, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDto} from '../model/login.dto';
import {Observable} from 'rxjs';
import {AuthorizationResponseDto} from '../model/authorization.response.dto';
import {AuthorizationService} from './authorization.service';

@Injectable({providedIn: 'root'})
export class AuthorizationRestService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = "api/v1/auth";

  login(login: LoginDto): Observable<AuthorizationResponseDto> {
    return this.http.post<AuthorizationResponseDto>(`${this.baseUrl}/login`, login);
  }

}
