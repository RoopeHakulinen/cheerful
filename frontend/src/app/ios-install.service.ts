import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { environment } from '../environments/environment';

@Injectable()
export class IosInstallService {
  constructor(private toastService: ToastService) {}

  private static isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  private static isInStandaloneMode(): boolean {
    return 'standalone' in window.navigator && (window.navigator as any).standalone;
  }

  showPopupIfOnIos(): void {
    if (IosInstallService.isIos() && !IosInstallService.isInStandaloneMode() && environment.production) {
      this.toastService.createToast('COMMON.INSTALL_PROMPT');
    }
  }
}
