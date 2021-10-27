import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

@Injectable()
export class IosInstallService {

  constructor(private popupService: PopupService) {
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
      this.popupService.createToast('COMMON.INSTALL_PROMPT');
    }
  }
}
