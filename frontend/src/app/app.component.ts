import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IosInstallService } from './ios-install-popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, public menuService: MenuService, private iosInstallService: IosInstallService) {
  }

  ngOnInit() {
    this.checkForUpdates();
    this.checkForIosInstallPopup();
  }

  private checkForUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar.open('A newer version is now available. Restart the app to update.', 'Close', {
          duration: 10000
        });
        this.swUpdate.activateUpdate()
          .then(() => {
            this.snackBar.open('New version installed.', 'Close', {
              duration: 3000
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }

  private checkForIosInstallPopup() {
    this.iosInstallService.showPopupIfOnIos();
  }
}
