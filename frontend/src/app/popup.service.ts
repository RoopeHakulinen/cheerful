import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
  }

  createPopup(text: string, duration: number): void {
    this.snackBar.open(this.translate.instant(text), this.translate.instant('COMMON.CLOSE'), {
      duration: duration
    });
  }
}
