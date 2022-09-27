import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './user';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user = new Subject<Partial<User>>();

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  navigateToApp(): void {
    this.router.navigate(['/app']);
  }

  signOut(): Observable<void> {
    return this.http.get<void>('/api/users/logout');
  }

  isSignedIn(): Observable<Partial<User>> {
    return this.http.get<Partial<User>>('/api/users/me');
  }
}
