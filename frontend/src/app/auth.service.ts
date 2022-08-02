import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, Subscription, take } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements OnDestroy {
  user = new Subject<Partial<User>>();
  userSubscription: Subscription | null = null;

  constructor(private authService: SocialAuthService, private router: Router, private userService: UserService) {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      if (user === null) {
        this.router.navigate(['/']);
      } else {
        this.userSubscription = this.userService.getOrCreate(user).subscribe((user) => this.user.next(user));
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => this.navigateToApp());
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => this.navigateToApp());
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  navigateToApp(): void {
    this.router.navigate(['/app']);
  }

  isSignedIn(): Observable<boolean> {
    return this.authService.authState.pipe(
      map((user) => user !== null),
      take(1),
    );
  }
}
