import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {MenuService} from './menu.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar, public menuService: MenuService) {
    // this.swUpdate.available.subscribe(() => {
    //   this.snackBar.open('A newer version is now available. Refresh the page or restart the app to update.', 'Close', {
    //     duration: 10000
    //   });
    //   // this.swUpdate.activateUpdate();
    // });
    // this.swUpdate.checkForUpdate();
  }
}
