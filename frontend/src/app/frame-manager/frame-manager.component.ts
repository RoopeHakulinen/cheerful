import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoreographyFrame } from '../choreography-frame';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @Input()
  isPlaying: boolean;

  @Output()
  add = new EventEmitter<void>();
  @Output()
  activeChanged = new EventEmitter<number>();
  @Output()
  remove = new EventEmitter<number>();
  @Output()
  play = new EventEmitter<void>();
  @Output()
  pause = new EventEmitter<void>();
  @Output()
  toggleAnimations = new EventEmitter<boolean>();
  @Output()
  toggleLooping = new EventEmitter<boolean>();


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
