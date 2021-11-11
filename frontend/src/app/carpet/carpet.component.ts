import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Carpet } from '../carpet';
import { ChoreographyItem, Content, getPeopleForContent, PersonContent, Position } from '../choreography-item';
import { Frame } from '../frame';
import {
  FiveGroup,
  FourGroup,
  isFiveGroup,
  isFourGroup,
  isGroup,
  isPerson,
  isThreeGroup,
  isTwoGroup,
  ThreeGroup,
  TwoGroup,
} from '../choreography-group';
import { Person } from '../people';
import { Choreography } from '../choreography';

interface PositionCoordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-carpet',
  templateUrl: './carpet.component.html',
  styleUrls: ['./carpet.component.scss'],
  animations: [
    trigger('animate', [
      transition('void => *', [
        style({ transform: `translate({{x}}px, {{y}}px)` }),
        animate('{{time}}', style({ transform: 'translate(0px, 0px)' })),
      ], {
        params: {
          time: '0s',
        },
      }),
    ]),
  ],
})
export class CarpetComponent implements OnChanges, OnDestroy {
  @Input()
  choreography!: Choreography;
  @Input()
  carpet!: Carpet;
  @Input()
  frame!: Frame;
  @Input()
  nextFrame!: Frame;
  @Input()
  activeItem: ChoreographyItem | null = null;
  @Input()
  animationDuration!: number;
  @Input()
  areAnimationsOn!: boolean;
  @Input()
  people: Person[] | null = null;

  @Output()
  active = new EventEmitter<ChoreographyItem>();
  @Output()
  swap = new EventEmitter<{ first: number, second: number }>();

  @ViewChild('tile', { read: ElementRef })
  tileReference!: ElementRef;

  verticalSegments: void[] = [];
  horizontalSegments: void[] = [];
  animate = false;
  lastItems: ChoreographyItem[] = [];
  subscriptions = new Subscription();
  draggedItemIndex: number | null = null;
  isDeletable = false;

  get frameToShow(): Frame {
    return this.frame.type === 'transition' ? this.nextFrame : this.frame;
  }

  swapPositions(event: number): void {
    const first = this.draggedItemIndex!;
    const second = event;
    this.swap.emit({ first, second });
    this.isDeletable = false;
    this.active.emit(this.frame.grid[event]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.frame && changes.frame.previousValue && changes.frame.previousValue.grid !== changes.frame.currentValue.grid) {
      this.lastItems = changes.frame.previousValue.grid;
      this.animate = !this.animate;
    }
    if (changes.carpet && changes.carpet.previousValue !== changes.carpet.currentValue) {
      this.verticalSegments = Array(changes.carpet.currentValue.verticalSegments).fill(0);
      this.horizontalSegments = Array(changes.carpet.currentValue.horizontalSegments).fill(0);
    }
  }

  findTranslation(item: ChoreographyItem, index: number): PositionCoordinates {
    const [lastItem, lastItemIndex] = this.findItemByContent(this.lastItems, item.content);
    return this.itemDifference(lastItem, item, lastItemIndex, index);
  }

  getAnimationParams(item: ChoreographyItem, index: number): { x: number, y: number, time: string } {
    const baseDuration = this.animationDuration / 1000;
    const duration = this.frame.type === 'transition' ? (this.frame.duration + 1) * baseDuration : baseDuration;
    return {
      ...this.findTranslation(item, index),
      time: this.areAnimationsOn ? `${duration}s` : '0s',
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  adjustItemDifferenceBasedOnPosition(param: PositionCoordinates, endPosition: Position, startPosition: Position): PositionCoordinates {
    let x = param.x;

    if (startPosition === 'right' && endPosition === 'left') {
      x = param.x + 46;
    } else if (startPosition === 'center' && endPosition === 'left') {
      x = param.x + 23;
    } else if (startPosition === 'left' && endPosition === 'right') {
      x = param.x - 46;
    } else if (startPosition === 'center' && endPosition === 'right') {
      x = param.x - 23;
    } else if (startPosition === 'left' && endPosition === 'center') {
      x = param.x - 23;
    } else if (startPosition === 'right' && endPosition === 'center') {
      x = param.x + 23;
    }

    return { ...param, x };
  }

  private itemDifference(startItem: ChoreographyItem | null, endItem: ChoreographyItem, startItemIndex: number, endItemIndex: number): PositionCoordinates {
    if (startItem === null || startItemIndex === -1) {
      return { x: 0, y: 0 };
    }
    let adjustedEndItem: ChoreographyItem = endItem;
    let adjustedEndItemIndex = endItemIndex;
    if (this.frame.type === 'transition') {
      const [tempItem, tempItemIndex] = this.findItemByContent(this.nextFrame.grid, startItem.content);
      adjustedEndItem = tempItem!;
      adjustedEndItemIndex = tempItemIndex;
    }

    const startX = startItemIndex % this.carpet.width;
    const startY = Math.floor(startItemIndex / this.carpet.height);
    const endX = adjustedEndItemIndex % this.carpet.width;
    const endY = Math.floor(adjustedEndItemIndex / this.carpet.height);

    return this.adjustItemDifferenceBasedOnPosition({
      x: (startX - endX) * this.tileReference?.nativeElement?.clientWidth ?? 0,
      y: (startY - endY) * this.tileReference?.nativeElement?.clientHeight ?? 0,
    }, adjustedEndItem.position, startItem.position);
  }

  dragStarted(index: number): void {
    this.draggedItemIndex = index;
    this.isDeletable = true;
  }

  isTwoGroup(content: Content): content is TwoGroup {
    return isTwoGroup(content);
  }

  isThreeGroup(content: Content): content is ThreeGroup {
    return isThreeGroup(content);
  }

  isFourGroup(content: Content): content is FourGroup {
    return isFourGroup(content);
  }

  isFiveGroup(content: Content): content is FiveGroup {
    return isFiveGroup(content);
  }

  isPerson(content: Content): content is PersonContent {
    return isPerson(content);
  }

  private findItemByContent(items: ChoreographyItem[], content: Content): [ChoreographyItem | null, number] {
    if (!items || !content) {
      return [null, -1];
    }

    function itemIdentityPredicate(item: ChoreographyItem): boolean {
      const isSameIdentity = JSON.stringify(getPeopleForContent(item.content)) === JSON.stringify(getPeopleForContent(content));
      const doesPersonBelongToGroupFromLastRound = isGroup(item.content) && isPerson(content) && getPeopleForContent(item.content).includes(content.personId);
      return isSameIdentity || doesPersonBelongToGroupFromLastRound;
    }

    return [items.find(itemIdentityPredicate) ?? null, items.findIndex(itemIdentityPredicate)];
  }
}
