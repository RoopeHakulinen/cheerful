import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-eight-counter',
  templateUrl: './eight-counter.component.html',
  styleUrls: ['./eight-counter.component.scss'],
})
export class EightCounterComponent implements OnChanges {
  @Input()
  duration!: number;
  @Input()
  activeFrame!: number;
  @Input()
  tempo!: number;
  @Input()
  isPlayingOn!: boolean;
  @Input()
  isSpeechSynthesisOn!: boolean;

  speechSynthesisWindow: SpeechSynthesis = window.speechSynthesis;
  speechSynthesis: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
  timerId: number | null = null;

  get cycleNumber(): number {
    return Math.floor(this.activeFrame / this.tempo) + 1;
  }

  constructor() {
    this.speechSynthesis.rate = 2;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isSpeechSynthesisOn && this.isPlayingOn) {
      this.startSpeechSynthesis();
    } else {
      this.pauseSpeechSynthesis();
    }
  }

  private startSpeechSynthesis(): void {
    this.speechSynthesis.text = this.cycleNumber.toString();
    this.speechSynthesisWindow.speak(this.speechSynthesis);
  }

  private pauseSpeechSynthesis(): void {
    if (this.speechSynthesisWindow) {
      this.speechSynthesisWindow.cancel();
    }
  }
}
