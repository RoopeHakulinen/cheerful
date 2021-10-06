import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IosInstallService } from './ios-install-popup.service';
import { ChoreographyService } from './choreography.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, public menuService: MenuService, private iosInstallService: IosInstallService, public choreographyService: ChoreographyService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.initializeLocalization().subscribe(() => {
      this.checkForUpdates();
      this.checkForIosInstallPopup();
    });
  }

  private checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar.open(this.translate.instant('COMMON.UPDATE_PROMPT'), this.translate.instant('COMMON.CLOSE'), {
          duration: 10000
        });
      });
      this.swUpdate.activateUpdate()
        .then(() => {
          this.snackBar.open(this.translate.instant('COMMON.UPDATE_SUCCESSFUL'), this.translate.instant('COMMON.CLOSE'), {
            duration: 3000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  private checkForIosInstallPopup(): void {
    this.iosInstallService.showPopupIfOnIos();
  }

  private initializeLocalization(): Observable<boolean> {
    this.translate.setDefaultLang('fi');
    return this.translate.use('fi');
  }
}
