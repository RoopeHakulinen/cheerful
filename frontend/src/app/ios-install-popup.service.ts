import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class IosInstallService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
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
      this.snackBar.open(this.translate.instant('COMMON.INSTALL_PROMPT'), this.translate.instant('COMMON.CLOSE'), {
        duration: 5000
      });
    }
  }
}
