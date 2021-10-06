import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IosInstallService } from './ios-install-popup.service';
import { ChoreographyService } from './choreography.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, public menuService: MenuService, private iosInstallService: IosInstallService, public choreographyService: ChoreographyService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.checkForUpdates();
    this.checkForIosInstallPopup();
    this.initializeLocalization();
  }

  private checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.translate.get(['COMMON.UPDATE_PROMPT', 'COMMON.CLOSE']).subscribe(translation => this.snackBar.open(translation['COMMON.UPDATE_PROMPT'], translation['COMMON.CLOSE'], {
          duration: 10000
        }));
      });
      this.swUpdate.activateUpdate()
        .then(() => {
          this.translate.get(['COMMON.UPDATE_SUCCESFUL', 'COMMON.CLOSE']).subscribe(translation => this.snackBar.open(translation['COMMON.UPDATE_SUCCESFUL'], translation['COMMON.CLOSE'], {
            duration: 3000
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  private checkForIosInstallPopup(): void {
    this.iosInstallService.showPopupIfOnIos();
  }

  private initializeLocalization(): void {
    this.translate.setDefaultLang('fi');
    this.translate.use('fi');
  }
}
