import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class IosInstallService {

  constructor(private snackBar: MatSnackBar) {
  }

  private static isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  private static isInStandaloneMode(): boolean {
    return ('standalone' in window.navigator && (window.navigator as any).standalone);
  }

  showPopupIfOnIos(): void {
    if (IosInstallService.isIos() && !IosInstallService.isInStandaloneMode()) {
      this.snackBar.open('Tap the share button ↑ and add to Home Screen', 'Close', {
        duration: 5000
      });
    }
  }
}
