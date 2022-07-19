import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditNameDialogData {
  name: string;
}

@Component({
  selector: 'app-edit-name-dialog',
  templateUrl: './edit-name-dialog.component.html',
  styleUrls: ['./edit-name-dialog.component.scss']
})
export class EditNameDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<EditNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditNameDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
