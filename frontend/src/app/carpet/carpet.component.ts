import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carpet } from '../carpet';
import { ChoreographyFrame } from '../choreography-frame';
import { ChoreographyItem } from '../choreography-item';

@Component({
  selector: 'app-carpet',
  templateUrl: './carpet.component.html',
  styleUrls: ['./carpet.component.scss']
})
export class CarpetComponent implements OnInit {
  @Input()
  carpet: Carpet;
  @Input()
  frame: ChoreographyFrame;
  @Input()
  activeItem: ChoreographyItem;

  @Output()
  active = new EventEmitter<ChoreographyItem>();

  segments: any[];
  tileDimension = 50;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.carpet)
    this.segments = Array(this.carpet.segments).fill(0);
  }

}
