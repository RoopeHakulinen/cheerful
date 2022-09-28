import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query, QueryOutput } from 'rx-query';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<QueryOutput<User[]>> {
    return query('users', () => this.http.get<User[]>('/api/users'));
  }
}
