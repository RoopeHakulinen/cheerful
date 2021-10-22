import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChoreographyFrame } from '../choreography-frame';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-frame-manager',
  templateUrl: './frame-manager.component.html',
  styleUrls: ['./frame-manager.component.scss']
})
export class FrameManagerComponent implements OnChanges {

  @Input()
  frames!: ChoreographyFrame[];
  @Input()
  active!: number;
  @Input()
  activeSubframe!: number;
  @Input()
  isPlaying!: boolean;
  @Input()
  areAnimationsOn!: boolean;
  @Input()
  isLoopingOn!: boolean;
  @Input()
  frameInterval!: number;
  @Input()
  isVoiceSynthesisOn!: boolean;
  @Input()
  carpetWidth!: number;
  @Input()
  carpetHeight!: number;
  @Input()
  carpetHorizontalSegments!: number;
  @Input()
  carpetVerticalSegments!: number;

  @Output()
  add = new EventEmitter<void>();
  @Output()
  changeActiveFrame = new EventEmitter<number>();
  @Output()
  changeActiveSubframe = new EventEmitter<number>();
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
  @Output()
  changeHorizontalSegments = new EventEmitter<number>();
  @Output()
  changeVerticalSegments = new EventEmitter<number>();
  @Output()
  changeSubframeToPreviousSubframe = new EventEmitter<void>();

  horizontalLineOptions: number[] = [];
  verticalLineOptions: number[] = [];
  carpetHeightOptions: number[] = [];
  carpetWidthOptions: number[] = [];

  get frameIntervalAsTempo(): string {
    if (this.frameInterval === 2500) {
      return '4/10';
    }
    if (this.frameInterval === 3333) {
      return '3/10';
    }
    if (this.frameInterval === 5000) {
      return '2/10';
    }
    if (this.frameInterval === 10000) {
      return '1/10';
    }
    return '-';
  }

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private translate: TranslateService) {
    this.carpetHeightOptions = Array(16).fill(0).map((x, i) => i);
    this.carpetWidthOptions = Array(16).fill(0).map((x, i) => i);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.carpetHorizontalSegments || changes.carpetHeight) {
      this.horizontalLineOptions = Array(this.carpetHeight).fill(0).map((x, i) => i);
    }
    if (changes.carpetVerticalSegments || changes.carpetWidth) {
      this.verticalLineOptions = Array(this.carpetWidth).fill(0).map((x, i) => i);
    }
  }

  removeClicked(index: number): void {
    if (this.frames.length === 1) {
      this.snackBar.open(this.translate.instant('FRAME_MANAGER.ONE_FRAME_LEFT'), this.translate.instant('COMMON.CLOSE'), {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove.emit(index);
        this.snackBar.open(this.translate.instant('FRAME_MANAGER.FRAME_REMOVED'), this.translate.instant('COMMON.CLOSE'), {
          duration: 2500
        });
      }
    });
  }

  emitFrameDurationChange(newTempo: number): void {
    this.frameDurationChange.emit(Math.floor((10 / newTempo) * 1000));
  }

  moveFrames(event: CdkDragDrop<string[]>): void {
    this.switchFramePosition.emit([event.previousIndex, event.currentIndex]);
  }

  emitCarpetWidthChange(newWidth: number): void {
    this.changeCarpetWidth.emit(newWidth);
    if (newWidth < this.carpetVerticalSegments || newWidth % this.carpetVerticalSegments !== 0) {
      this.changeVerticalSegments.emit(newWidth);
    }
  }

  emitCarpetHeightChange(newHeight: number): void {
    this.changeCarpetHeight.emit(newHeight);
    if (newHeight < this.carpetHorizontalSegments || newHeight % this.carpetHorizontalSegments !== 0) {
      this.changeHorizontalSegments.emit(newHeight);
    }
  }

  copySubframeFromPreviousSubframe(): void {
    this.changeSubframeToPreviousSubframe.emit();
  }
}
