import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    user: SocialUser | null = null;

    constructor(private authService: SocialAuthService) {
        this.authService.authState.subscribe((user) => {
            console.log(user);
            this.user = user;
        });
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }
}
