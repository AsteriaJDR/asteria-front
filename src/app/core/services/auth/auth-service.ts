import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SigninCredentials} from '../../interfaces/signin-credentials';
import {SigninResponse} from '../../interfaces/signin-response';
import {SignupResponse} from '../../interfaces/signup-response';
import {SignupCredentials} from '../../interfaces/signup-credentials';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_API_URL = 'http://localhost:3000/api/auth';

  private currentUser: {username: string, email: string} | undefined;

  constructor(private http: HttpClient) {}

  setCurrentUser(user: {username: string, email: string}) {
    this.currentUser = user;
  }

  getCurrentUser(): {username: string, email: string} | undefined {
    return this.currentUser;
  }

  removeCurrentUser(): void {
    this.currentUser = undefined;
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${this.AUTH_API_URL}/signin`, credentials, {withCredentials: true})
      .pipe(
        tap((response: SigninResponse) => this.setCurrentUser(response.user))
      );
  }

  signup(credentials: SignupCredentials): Observable<any> {
    return this.http.post<SignupResponse>(`${this.AUTH_API_URL}/signup`, credentials, {withCredentials: true})
      .pipe(
        tap((response: SignupResponse) => this.setCurrentUser(response.user))
      );
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.AUTH_API_URL}/me`, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.AUTH_API_URL}/logout`, {}, {withCredentials: true})
      .pipe(
        tap(() => this.removeCurrentUser())
      );
  }
}
