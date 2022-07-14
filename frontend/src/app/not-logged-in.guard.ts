import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isSignedIn().pipe(
      tap((status) => {
        if (status) {
          this.authService.navigateToApp();
        }
      }),
      map((status) => !status),
    );
  }
}
