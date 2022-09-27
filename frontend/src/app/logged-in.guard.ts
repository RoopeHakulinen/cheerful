import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (environment.e2e) {
      return true;
    }
    return this.authService.isSignedIn().pipe(
      map((user: Partial<User>) => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      }),
    );
  }
}
