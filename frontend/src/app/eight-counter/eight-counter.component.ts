import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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

  @Output()
  synthesisVoiceOptions: string[];

  counterNumber: number;
  speechSynthesisWindow: SpeechSynthesis;
  speechSynthesis: SpeechSynthesisUtterance;
  timerId: number;
  progressBarValue = 0;
  timeElapsedInFrame = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.speechSynthesisWindow = window.speechSynthesis;
    this.speechSynthesis = new SpeechSynthesisUtterance();
    this.speechSynthesis.rate = 2;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setCounterNumber();
    this.setSpeechSynthesis();
    if (this.isPlayingOn) {
      this.setProgressBar();
    }
  }

  setProgressBar() {
    let timeElapsedInFrame = 0;
    const timerId = window.setInterval(() => {
      timeElapsedInFrame = timeElapsedInFrame + 200;
      this.progressBarValue = Math.floor((timeElapsedInFrame / this.duration) * 100);
      console.log(this.progressBarValue)
      if (!this.isPlayingOn || (timeElapsedInFrame >= this.duration)) {
        window.clearInterval(timerId);
      }
    }, 200)
  }

  private setCounterNumber() {
    this.counterNumber = 1 + (this.frameIndex % this.tempo);

  }

  private setSpeechSynthesis() {
    if (this.isPlayingOn && this.isVoiceSynthesisOn) {
      this.speechSynthesis.text = (this.counterNumber.toString());
      this.speechSynthesisWindow.speak(this.speechSynthesis);
    }
  }
}
