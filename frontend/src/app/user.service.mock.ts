import { Injectable } from '@angular/core';
import { QueryOutput } from 'rx-query';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user';
import { updateAllAttributes } from './utils';

@Injectable()
export class UserServiceMock {
  users: User[] = [
    {
      id: 1,
      firstName: 'testi',
      lastName: 'testaaja',
      email: 'test@test.test',
    },
  ];

  usersSubject = new BehaviorSubject<QueryOutput<User[]>>({status: 'success', data: this.users} as any);

  getUsers(): Observable<QueryOutput<User[]>> {
    return this.usersSubject.asObservable();
  }

  getUserById(id: number): Observable<QueryOutput<User>> {
    return of({status: 'success', data: this.users.find(user => user.id === id)!} as any);
  }

  updateUser(user: User): Observable<User> {
    const foundUser = this.users.find(existingUser => existingUser.id === user.id)!;
    updateAllAttributes(user, foundUser);
    this.usersSubject.next({status: 'success', data: this.users} as any);
    return of(foundUser);
  }
}
