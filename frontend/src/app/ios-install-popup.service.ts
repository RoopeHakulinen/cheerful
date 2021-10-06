import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class IosInstallService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
    this.initializeLocalization();
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
      this.translate.get(['COMMON.INSTALL_PROMPT', 'COMMON.CLOSE']).subscribe(translation => this.snackBar.open(translation['COMMON.INSTALL_PROMPT'], translation['COMMON.CLOSE'], {
        duration: 5000
      }));
    }
  }

  private initializeLocalization(): void {
    this.translate.setDefaultLang('fi');
    this.translate.use('fi');
  }
}
