import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SortOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-sort-input',
  templateUrl: './sort-input.component.html',
  styleUrls: ['./sort-input.component.scss']
})
export class SortInputComponent {

  @Input()
  options: SortOption[] = [];

  sortOption: string = 'name';

  @Output()
  sortWith = new EventEmitter<string>();

  selectMethod(method: string): void {
    this.sortWith.emit(method);
  }
}
