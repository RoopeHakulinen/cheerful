import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    this.swUpdate.available.subscribe(() => {
      this.snackBar.open('A newer version is now available. Refresh the page or restart the app to update.', 'Close', {
        duration: 10000
      });
      // this.swUpdate.activateUpdate();
    });
    this.swUpdate.checkForUpdate();
  }
}
