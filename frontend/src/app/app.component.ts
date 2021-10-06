import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MenuService } from './menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IosInstallService } from './ios-install-popup.service';
import { ChoreographyService } from './choreography.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, public menuService: MenuService, private iosInstallService: IosInstallService, public choreographyService: ChoreographyService) {
  }

  ngOnInit(): void {
    this.checkForUpdates();
    this.checkForIosInstallPopup();
  }

  private checkForUpdates(): void {
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

  private checkForIosInstallPopup(): void {
    this.iosInstallService.showPopupIfOnIos();
  }
}
