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
  isVoiceSynthesisOn: boolean;

  counterNumber: number;
  speechSynthesisWindow: SpeechSynthesis;
  speechSynthesis: SpeechSynthesisUtterance;
  timerId: number;
  progressBarValue = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.speechSynthesisWindow = window.speechSynthesis;
    this.speechSynthesis = new SpeechSynthesisUtterance();
    this.speechSynthesis.rate = 2;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.frameIndex && changes.frameIndex.previousValue !== this.frameIndex) {
      this.setCounterNumber();
      this.resetProgressBar();
    }
    if (changes.isVoiceSynthesisOn && changes.isVoiceSynthesisOn.previousValue !== this.isVoiceSynthesisOn) {
      this.setSpeechSynthesis();
    }
    if (this.isPlayingOn) {
      this.initializeProgressBar();
    }
  }

  initializeProgressBar() {
    let timeElapsedInFrame = 0;
    let previousAnimationTime: number | null = null;
    const step = (timestamp: DOMHighResTimeStamp) => {
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

  private resetProgressBar() {
    this.progressBarValue = 0;
    window.cancelAnimationFrame(this.timerId);

  }

  private setCounterNumber() {
    this.counterNumber = (this.frameIndex % this.tempo) + 1;
  }

  private setSpeechSynthesis() {
    if (this.isPlayingOn && this.isVoiceSynthesisOn) {
      this.speechSynthesis.text = (this.counterNumber.toString());
      this.speechSynthesisWindow.speak(this.speechSynthesis);
    }
  }
}
