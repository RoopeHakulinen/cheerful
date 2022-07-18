import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOrCreate(user: SocialUser): Observable<Partial<SocialUser>> {
    return this.http.post<Partial<SocialUser>>(`/api/users`, user);
  }
}
