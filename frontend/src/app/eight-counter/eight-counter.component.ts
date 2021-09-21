import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-eight-counter',
  templateUrl: './eight-counter.component.html',
  styleUrls: ['./eight-counter.component.scss']
})
export class EightCounterComponent implements OnChanges, OnInit {

  @Input()
  duration: number;
  @Input()
  tempo: number;
  @Input()
  frameIndex: number;
  @Input()
  isPlayingOn: boolean;
  @Input()
  isSpeechSynthesisOn: boolean;

  frameNumber: number;
  speechSynthesisWindow: SpeechSynthesis;
  speechSynthesis: SpeechSynthesisUtterance;
  timerId: number;
  progressBarValue = 0;
  frameCount = 1;
  private subFrameInterval: number;

  constructor() {
  }

  ngOnInit(): void {
    this.speechSynthesisWindow = window.speechSynthesis;
    this.speechSynthesis = new SpeechSynthesisUtterance();
    this.speechSynthesis.rate = 2;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.frameIndex && changes.frameIndex.previousValue !== this.frameIndex) {
      this.setFrameNumber();
      this.resetCounterNumber();
      this.resetProgressBar();
    }
    if (this.isSpeechSynthesisOn && this.isPlayingOn) {
      this.startSpeechSynthesis();
    } else {
      this.pauseSpeechSynthesis()
    }
    if (this.isPlayingOn) {
      this.initializeProgressBar();
      this.setCounterNumber();
    }
  }

  initializeProgressBar(): void {
    let timeElapsedInFrame = 0;
    let previousAnimationTime: number | null = null;
    const step = (timestamp: DOMHighResTimeStamp): void => {
      if (previousAnimationTime === null) {
        previousAnimationTime = timestamp;
      }
      timeElapsedInFrame += (timestamp - previousAnimationTime);
      previousAnimationTime = timestamp;
      const progressBarValueExact = Math.floor((timeElapsedInFrame / (this.duration * 0.8)) * 100);
      if (this.progressBarValue + 1 < progressBarValueExact) {
        this.progressBarValue = progressBarValueExact;
      }
      if (this.isPlayingOn && timeElapsedInFrame < this.duration) {
        this.timerId = window.requestAnimationFrame(step);
      } else {
        this.resetProgressBar();
      }
    }
    this.timerId = window.requestAnimationFrame(step);
  }

  private resetProgressBar(): void {
    this.progressBarValue = 0;
    window.cancelAnimationFrame(this.timerId);
  }

  private setFrameNumber(): void {
    this.frameNumber = this.frameIndex + 1;
  }

  private startSpeechSynthesis(): void {
    this.speechSynthesis.text = this.frameNumber.toString()
    this.speechSynthesisWindow.speak(this.speechSynthesis);
  }

  private pauseSpeechSynthesis(): void {
    if (this.speechSynthesisWindow) {
      this.speechSynthesisWindow.cancel();
    }
  }

  private setCounterNumber(): void {
    let timeElapsedInSubFrame = 0;
    this.subFrameInterval = window.setInterval(() => {
      if (timeElapsedInSubFrame >= this.duration || !this.isPlayingOn) {
        this.resetCounterNumber();
      } else {
        timeElapsedInSubFrame += 100;
        this.frameCount = Math.floor((timeElapsedInSubFrame / this.duration) * 8) + 1
      }
    }, 100)
  }

  private resetCounterNumber() {
    window.clearInterval(this.subFrameInterval);
    this.frameCount = 1;
  }
}
