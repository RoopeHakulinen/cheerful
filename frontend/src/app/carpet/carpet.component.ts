import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Carpet } from '../carpet';
import { ChoreographyFrame } from '../choreography-frame';
import { ChoreographyItem } from '../choreography-item';

@Component({
  selector: 'app-carpet',
  templateUrl: './carpet.component.html',
  styleUrls: ['./carpet.component.scss'],
  animations: [
    trigger('animate', [
      transition('void => *', [
        style({ transform: `translate({{x}}px, {{y}}px)` }),
        animate('{{time}}', style({ transform: 'translate(0px, 0px)' }))
      ], {
        params: {
          time: '0s'
        }
      })
    ])
  ]
})
export class CarpetComponent implements OnChanges, OnDestroy {
  @Input()
  carpet: Carpet;
  @Input()
  frame: ChoreographyFrame;
  @Input()
  activeItem: ChoreographyItem | null = null;
  @Input()
  animationDuration: number;
  @Input()
  animationsOffFromCheckbox: boolean;

  @Output()
  active = new EventEmitter<ChoreographyItem>();
  @Output()
  swap = new EventEmitter<{ first: number | null, second: number }>();

  verticalSegments: any[];
  horizontalSegments: any[];
  tileDimension = 50;
  animate = false;
  animationsOn = false;
  lastItems: any[] = [];
  subscriptions = new Subscription();
  draggedItemIndex: number | null = null;


  swapPositions(event: number) {
    const first = this.draggedItemIndex;
    const second = event;
    this.swap.emit({ first, second });
    this.draggedItemIndex = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.frame && changes.frame.previousValue && changes.frame.previousValue.grid !== changes.frame.currentValue.grid) {
      this.lastItems = changes.frame.previousValue.grid;
      this.animationsOn = true;
      this.animate = !this.animate;
      if (this.animationsOffFromCheckbox) {
        this.animationsOn = false;
      }
    }
    if (changes.carpet && changes.carpet.previousValue !== changes.carpet.currentValue) {
      this.verticalSegments = Array(changes.carpet.currentValue.segments).fill(0);
      this.horizontalSegments = Array(changes.carpet.currentValue.height).fill(0);
      this.setTileDimension();
    }
  }

  @HostListener('window:resize')
  setTileDimension() {
    const el = document.querySelector('.carpet')?.parentElement?.parentElement ?? null;
    if (el === null) {
      return;
    }
    this.tileDimension = Math.min((el.clientWidth - 20) / this.carpet.width, 50);
  }

  findTranslation(item: ChoreographyItem, index: number) {
    const lastItemIndex = this.findItemByText(item.text);
    return this.itemDifference(lastItemIndex, index);
  }

  getAnimationParams(item: ChoreographyItem, index: number) {

    return {
      ...this.findTranslation(item, index),
      time: this.animationsOn ? `${this.animationDuration / 1000}s` : '0s'
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private itemDifference(lastIndex, currentIndex) {
    if (lastIndex === -1 || currentIndex === -1) {
      return { x: 0, y: 0 };
    }
    const startX = lastIndex % this.carpet.width;
    const startY = Math.floor(lastIndex / this.carpet.height);
    const endX = currentIndex % this.carpet.width;
    const endY = Math.floor(currentIndex / this.carpet.height);
    return {
      x: (startX - endX) * this.tileDimension,
      y: (startY - endY) * this.tileDimension
    };
  }

  private findItemByText(text: string) {
    if (!this.lastItems || !text || text.length === 0) {
      return -1;
    }
    return this.lastItems.findIndex(item => item.text === text);
  }
}
