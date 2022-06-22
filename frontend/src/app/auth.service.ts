import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    user: SocialUser | null = null;

    constructor(private authService: SocialAuthService, private router: Router) {
        this.authService.authState.subscribe((user) => {
            console.log(user);
            this.user = user;
            if (user !== null) {
                this.router.navigate(['/app']);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFacebook(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }
}
