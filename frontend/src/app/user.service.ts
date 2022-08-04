import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query, QueryOutput } from 'rx-query';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOrCreate(user: SocialUser): Observable<Partial<User>> {
    return this.http.post<Partial<User>>(`/api/users`, user);
  }

  getUsers(): Observable<QueryOutput<User[]>> {
    return query('users', () =>  this.http.get<User[]>('/api/users'));
  }
}
