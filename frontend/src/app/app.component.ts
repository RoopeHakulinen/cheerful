import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { IosInstallService } from './ios-install.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, public menuService: MenuService, private iosInstallService: IosInstallService, private popupService: PopupService, private translate: TranslateService) {
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
        this.popupService.createToast('COMMON.UPDATE_PROMPT', undefined, 10000);
      });
      this.swUpdate.activateUpdate()
        .then(() => {
          this.popupService.createToast('COMMON.UPDATE_SUCCESSFUL');
        })
        .catch(err => {
          this.popupService.createToast('COMMON.UPDATE_NOT_SUCCESSFUL');
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
