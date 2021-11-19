import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToastService } from '../toast.service';
import { FrameForShowing } from '../choreography/choreography.component';
import { ChoreographyContentNameDialogComponent } from './choreography-content-name-dialog/choreography-content-name-dialog.component';
import { Frame } from '../frame';

@Component({
  selector: 'app-frame-manager',
  templateUrl: './frame-manager.component.html',
  styleUrls: ['./frame-manager.component.scss'],
})
export class FrameManagerComponent implements OnChanges {
  @Input()
  frames!: Frame[];
  @Input()
  activeFrameIndex!: number;
  @Input()
  tempo!: number;
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
  addContentFrame = new EventEmitter<string>();
  @Output()
  addTransitionFrame = new EventEmitter<void>();
  @Output()
  changeActiveFrame = new EventEmitter<number[]>();
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
  changeFrameToPreviousFrame = new EventEmitter<void>();
  @Output()
  changeFramePosition = new EventEmitter<'up' | 'down'>();

  horizontalLineOptions: number[] = [];
  verticalLineOptions: number[] = [];
  carpetHeightOptions: number[] = [];
  carpetWidthOptions: number[] = [];

  framesToShow!: FrameForShowing[][];
  expandedFrames: number[] = [];

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

  constructor(private dialog: MatDialog, private toastService: ToastService) {
    this.carpetHeightOptions = Array(16)
      .fill(0)
      .map((x, i) => i);
    this.carpetWidthOptions = Array(16)
      .fill(0)
      .map((x, i) => i);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.carpetHorizontalSegments || changes.carpetHeight) {
      this.horizontalLineOptions = Array(this.carpetHeight)
        .fill(0)
        .map((x, i) => i);
    }
    if (changes.carpetVerticalSegments || changes.carpetWidth) {
      this.verticalLineOptions = Array(this.carpetWidth)
        .fill(0)
        .map((x, i) => i);
    }
    if (changes.frames) {
      this.framesToShow = this.buildFramesToShow();
    }
  }

  frameIndexToShow(frameIndex: number): number {
    if (frameIndex === 0) {
      return 0;
    }
    return this.frames
      .slice(0, frameIndex)
      .map((frame) => frame.duration)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  removeClicked(index: number): void {
    if (
      this.activeFrameIndex === 0 &&
      this.framesToShow[this.activeFrameIndex].length === 1
    ) {
      this.toastService.createToast('FRAME_MANAGER.ONE_FRAME_LEFT');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.remove.emit(index);
        this.toastService.createToast('FRAME_MANAGER.FRAME_REMOVED');
      }
    });
  }

  emitCarpetWidthChange(newWidth: number): void {
    this.changeCarpetWidth.emit(newWidth);
    if (
      newWidth < this.carpetVerticalSegments ||
      newWidth % this.carpetVerticalSegments !== 0
    ) {
      this.changeVerticalSegments.emit(newWidth);
    }
  }

  emitFrameDurationChange(newTempo: number): void {
    this.frameDurationChange.emit(Math.floor((10 / newTempo) * 1000));
  }

  moveFrames(event: CdkDragDrop<string[]>): void {
    this.switchFramePosition.emit([event.previousIndex, event.currentIndex]);
  }

  emitCarpetHeightChange(newHeight: number): void {
    this.changeCarpetHeight.emit(newHeight);
    if (
      newHeight < this.carpetHorizontalSegments ||
      newHeight % this.carpetHorizontalSegments !== 0
    ) {
      this.changeHorizontalSegments.emit(newHeight);
    }
  }

  isEightActive(frames: FrameForShowing[]): boolean {
    return frames.some(
      (frame) => frame.originalFrameIndex === this.activeFrameIndex
    );
  }

  copyFrameFromPreviousFrame(): void {
    this.changeFrameToPreviousFrame.emit();
  }

  addContentClicked(): void {
    const dialogRef = this.dialog.open(
      ChoreographyContentNameDialogComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addContentFrame.emit(result);
        this.toastService.createToast('FRAME_MANAGER.FRAME_ADDED');
      }
    });
  }

  filterExpandedFrames(index: number): void {
    this.expandedFrames = this.expandedFrames.filter(
      (frameIndex) => frameIndex !== index
    );
  }

  private buildFramesToShow(): FrameForShowing[][] {
    const result = [];
    let index = 0;
    const artificialFrames = this.frames
      .map((frame) => {
        const originalIndex = index;
        index++;
        return Array.from(Array(frame.duration)).map((_, durationIndex) => {
          return {
            ...frame,
            originalFrameIndex: originalIndex,
            isActualFrame: durationIndex === 0,
          };
        });
      })
      .flat();
    for (let i = 0; i < artificialFrames.length; i += this.tempo) {
      result.push(artificialFrames.slice(i, i + this.tempo));
    }
    return result;
  }
}
