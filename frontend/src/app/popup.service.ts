import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
  }

  createToast(translationKey: string, closeToastKey: string = 'COMMON.CLOSE', duration: number = 3000): void {
    this.createToastRaw(this.translate.instant(translationKey), this.translate.instant(closeToastKey), duration);
  }

  createToastRaw(popupText: string, closePopupText: string = this.translate.instant('COMMON.CLOSE'), duration: number = 3000): void {
    this.snackBar.open(popupText, closePopupText, {
      duration: duration
    });
  }
}
