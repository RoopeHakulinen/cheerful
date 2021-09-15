import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eight-counter',
  templateUrl: './eight-counter.component.html',
  styleUrls: ['./eight-counter.component.scss']
})
export class EightCounterComponent implements OnInit {

  @Input()
  duration: number;
  @Input()
  tempo: number;
  count: number;
  private countIntervalId: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  play() {
    this.countIntervalId = window.setInterval(() => {
      this.count = 1 + this.count;
    }, this.duration);
  }
}
