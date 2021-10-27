import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { IosInstallService } from './ios-install.service';
import { ChoreographyService } from './choreography.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, public menuService: MenuService, private iosInstallService: IosInstallService, public choreographyService: ChoreographyService, private popupService: PopupService, private translate: TranslateService) {
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
        this.popupService.createPopup('COMMON.UPDATE_PROMPT', 10000);
      });
      this.swUpdate.activateUpdate()
        .then(() => {
          this.popupService.createPopup('COMMON.UPDATE_SUCCESSFUL', 3000);
        })
        .catch(err => {
          this.popupService.createPopup('COMMON.UPDATE_NOT_SUCCESSFUL', 5000);
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
