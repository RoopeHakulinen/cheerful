import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choreography-content-name-dialog',
  templateUrl: './choreography-content-name-dialog.component.html',
  styleUrls: ['./choreography-content-name-dialog.component.scss'],
})
export class ChoreographyContentNameDialogComponent {
  name = '';
  copyPrevious = true;

  constructor(public dialogRef: MatDialogRef<ChoreographyContentNameDialogComponent>) {}
}
