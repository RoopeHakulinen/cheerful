import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-choreography-dialog',
  templateUrl: './save-choreography-dialog.component.html',
  styleUrls: ['./save-choreography-dialog.component.scss']
})
export class SaveChoreographyDialogComponent {
  constructor(public dialogRef: MatDialogRef<SaveChoreographyDialogComponent>) {
  }
}
