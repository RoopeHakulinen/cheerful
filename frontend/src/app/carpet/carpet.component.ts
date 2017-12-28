import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Carpet } from '../carpet';
import { ChoreographyFrame } from '../choreography-frame';
import { ChoreographyItem } from '../choreography-item';

@Component({
  selector: 'app-carpet',
  templateUrl: './carpet.component.html',
  styleUrls: ['./carpet.component.scss']
})
export class CarpetComponent implements OnInit, OnChanges {
  @Input()
  carpet: Carpet;
  @Input()
  frame: ChoreographyFrame;
  @Input()
  activeItem: ChoreographyItem;

  @Output()
  active = new EventEmitter<ChoreographyItem>();
  @Output()
  swap = new EventEmitter<{ first: number, second: number }>();

  segments: any[];
  tileDimension = 50;

  constructor(private dragulaService: DragulaService) {
    this.dragulaService.drop.subscribe((value) => {
      const first = parseInt(value[2].getAttribute('index'), 10);
      const second = parseInt(value[3].getAttribute('index'), 10);
      this.swap.emit({ first, second });
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.carpet && changes.carpet.previousValue !== changes.carpet.currentValue) {
      this.segments = Array(changes.carpet.currentValue.segments).fill(0);
    }
  }
}
