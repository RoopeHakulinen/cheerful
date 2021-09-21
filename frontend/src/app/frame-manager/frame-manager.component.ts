import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChoreographyFrame } from '../choreography-frame';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-frame-manager',
  templateUrl: './frame-manager.component.html',
  styleUrls: ['./frame-manager.component.scss']
})
export class FrameManagerComponent {

  @Input()
  frames: ChoreographyFrame[];
  @Input()
  active: number;
  @Input()
  isPlaying: boolean;
  @Input()
  areAnimationsOn: boolean;
  @Input()
  isLoopingOn: boolean;
  @Input()
  frameInterval: number;
  @Input()
  isVoiceSynthesisOn: boolean;
  @Input()
  carpetWidth: number;
  @Input()
  carpetHeight: number;

  @Output()
  add = new EventEmitter<void>();
  @Output()
  activeChanged = new EventEmitter<number>();
  @Output()
  remove = new EventEmitter<number>();
  @Output()
  playFrames = new EventEmitter<void>();
  @Output()
  pauseFrames = new EventEmitter<void>();
  @Output()
  toggleAnimations = new EventEmitter<void>();
  @Output()
  toggleLooping = new EventEmitter<void>();
  @Output()
  frameDurationChange = new EventEmitter<number>();
  @Output()
  toggleVoiceSynthesis = new EventEmitter<void>();
  @Output()
  switchFramePosition = new EventEmitter<number[]>();
  @Output()
  changeCarpetWidth = new EventEmitter<number>();
  @Output()
  changeCarpetHeight = new EventEmitter<number>();


  get frameIntervalAsSeconds(): number {
    return this.frameInterval / 1000;
  }

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  removeClicked(index: number): void {
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

  emitFrameDurationChange($event: Event): void {
    this.frameDurationChange.emit(parseFloat(($event.target as HTMLInputElement).value) * 1000);
  }

  moveFrames(event: CdkDragDrop<string[]>): void {
    this.switchFramePosition.emit([event.previousIndex, event.currentIndex]);
  }

  emitCarpetWidthChange($event: Event): void {
    this.changeCarpetWidth.emit(parseFloat(($event.target as HTMLInputElement).value))
  }

  emitCarpetHeightChange($event: Event): void {
    this.changeCarpetHeight.emit(parseFloat(($event.target as HTMLInputElement).value))
  }
}
