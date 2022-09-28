import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChoreographyPerson } from '../../choreography';

@Component({
  selector: 'app-people-manager-dialog',
  templateUrl: './people-manager-dialog.component.html',
  styleUrls: ['./people-manager-dialog.component.scss'],
})
export class PeopleManagerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PeopleManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { people: ChoreographyPerson[] },
  ) {}

  selectPerson(id: number): void {
    this.dialogRef.close({ id, deselect: false });
  }

  deselectTile(): void {
    this.dialogRef.close({ id: null, deselect: true });
  }

  addPerson(): void {
    //TODO: implement
    this.data.people = [...this.data.people, { personId: 20, color: null }];
  }
}
