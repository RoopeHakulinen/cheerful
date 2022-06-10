import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag, tags } from '../tags/tags.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent {

  @Input()
  allowAdding!: boolean;

  @Input()
  selectedTags: Tag[] = [];

  @Output()
  selectionChange = new EventEmitter<Tag[]>();

  tags = tags;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<Tag[]>;


  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: number | string | null) => (typeof tag === 'string' || tag === null ? this._filter(tag) : this.tags.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.allowAdding) {
      return;
    }

    const value = (event.value || '').trim();
    const tag = { id: Math.floor(Math.random() * 1000), name: value };

    this.selectedTags.push(tag);
    this.selectionChange.emit(this.selectedTags);

    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }

    this.selectionChange.emit(this.selectedTags);

    this.tagCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tag = tags.find(tag => tag.id === event.option.value)!;

    this.selectedTags.push(tag);
    this.selectionChange.emit(this.selectedTags);

    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(query: string | null): Tag[] {
    return this.tags.filter(tag =>
      this.selectedTags.every(selectedTag => selectedTag.id !== tag.id)
      && (query === null || tag.name.toLowerCase().includes(query!.toLowerCase()))
    );
  }
}
