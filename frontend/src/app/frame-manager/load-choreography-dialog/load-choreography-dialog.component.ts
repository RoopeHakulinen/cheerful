import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-load-choreography-dialog',
  templateUrl: './load-choreography-dialog.component.html',
  styleUrls: ['./load-choreography-dialog.component.scss']
})
export class LoadChoreographyDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoadChoreographyDialogComponent>) {
  }
}
