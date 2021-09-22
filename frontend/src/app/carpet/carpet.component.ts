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
  areAnimationsOn: boolean;

  @Output()
  active = new EventEmitter<ChoreographyItem>();
  @Output()
  swap = new EventEmitter<{ first: number, second: number }>();
  @Output()
  deletePerson = new EventEmitter<number>();

  verticalSegments: any[];
  horizontalSegments: any[];
  tileDimension = 50;
  animate = false;
  lastItems: any[] = [];
  subscriptions = new Subscription();
  draggedItemIndex: number;
  isDeletable: boolean;

  swapPositions(event: number): void {
    const first = this.draggedItemIndex!;
    const second = event;
    this.swap.emit({ first, second });
    this.isDeletable = false;
    console.log(first, second);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.frame && changes.frame.previousValue && changes.frame.previousValue.grid !== changes.frame.currentValue.grid) {
      this.lastItems = changes.frame.previousValue.grid;
      this.animate = !this.animate;
    }
    if (changes.carpet && changes.carpet.previousValue !== changes.carpet.currentValue) {
      this.verticalSegments = Array(changes.carpet.currentValue.verticalSegments).fill(0);
      this.horizontalSegments = Array(changes.carpet.currentValue.horizontalSegments).fill(0);
      this.setTileDimension();
    }
  }

  @HostListener('window:resize')
  setTileDimension(): void {
    const el = document.querySelector('.carpet')?.parentElement?.parentElement ?? null;
    if (el === null) {
      return;
    }
    this.tileDimension = Math.min((el.clientWidth - 20) / this.carpet.width, 50);
  }

  findTranslation(item: ChoreographyItem, index: number): { x: number, y: number } {
    const lastItemIndex = this.findItemByText(item.text);
    return this.itemDifference(lastItemIndex, index);
  }

  getAnimationParams(item: ChoreographyItem, index: number): { x: number, y: number, time: string } {

    return {
      ...this.findTranslation(item, index),
      time: this.areAnimationsOn ? `${this.animationDuration / 1000}s` : '0s'
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private itemDifference(lastIndex: number, currentIndex: number): { x: number, y: number } {
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

  private findItemByText(text: string): number {
    if (!this.lastItems || !text || text.length === 0) {
      return -1;
    }
    return this.lastItems.findIndex(item => item.text === text);
  }

  dragStarted(index: number): void {
    this.draggedItemIndex = index;
    this.isDeletable = true;
  }

  deleteDraggedPerson(): void {
    this.deletePerson.emit(this.draggedItemIndex);
    console.log('i am deleted: ', this.draggedItemIndex);
  }
}
