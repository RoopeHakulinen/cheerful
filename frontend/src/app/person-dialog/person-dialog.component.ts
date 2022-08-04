import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PersonDialogData {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonDialogData,
  ) {}

  isValid(data: PersonDialogData): boolean {
    return data.firstName.length > 0 && data.lastName.length > 0;
  }
}
