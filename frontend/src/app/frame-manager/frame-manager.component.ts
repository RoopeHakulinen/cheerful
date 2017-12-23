import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChoreographyFrame } from '../choreography-frame';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-frame-manager',
  templateUrl: './frame-manager.component.html',
  styleUrls: ['./frame-manager.component.scss']
})
export class FrameManagerComponent implements OnInit {

  @Input()
  frames: ChoreographyFrame[];
  @Input()
  active: number;

  @Output()
  add = new EventEmitter<void>();
  @Output()
  remove = new EventEmitter<number>();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  removeClicked(index: number) {
    if (this.frames.length === 1) {
      this.snackBar.open('Only one frame left', 'Close', {
        duration: 5000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove.emit(index);
        this.snackBar.open('Frame removed', 'Close', {
          duration: 2500
        });
      }
    });
  }
}
