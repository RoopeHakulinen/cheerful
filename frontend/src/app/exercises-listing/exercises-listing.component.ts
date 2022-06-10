import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Exercise } from '../exercises/exercises.component';
import { Tag } from '../tags/tags.component';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    this.translate.getTranslation(this.translate.currentLang).subscribe((translations) => this.updateTranslations(translations));
    this.translate.onLangChange.subscribe((event) => this.updateTranslations(event.translations));
  }

  updateTranslations(translations: any): void {
    this.itemsPerPageLabel = translations['PAGINATION']['ITEMS_PER_PAGE'];
    this.nextPageLabel = translations['PAGINATION']['NEXT_PAGE'];
    this.previousPageLabel = translations['PAGINATION']['PREVIOUS_PAGE'];
    this.firstPageLabel = translations['PAGINATION']['FIRST_PAGE'];
    this.lastPageLabel = translations['PAGINATION']['LAST_PAGE'];
    this.changes.next();
  }

  changes = new Subject<void>();

  firstPageLabel = '';
  itemsPerPageLabel = '';
  lastPageLabel = '';
  nextPageLabel = '';
  previousPageLabel = '';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translate.instant(`PAGINATION.PAGE_1_OF_1`);
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.translate.instant(`PAGINATION.PAGE_N_OF_M`,{page: page + 1, numberOfPages: amountPages});
  }
}

@Component({
  selector: 'app-exercises-listing',
  templateUrl: './exercises-listing.component.html',
  styleUrls: ['./exercises-listing.component.scss']
})
export class ExercisesListingComponent implements OnInit {

  @Input()
  exercises!: Exercise[];

  filteredExercises: Exercise[] = [];
  shownExercises: Exercise[] = [];
  tags: Tag[] = [];

  minDifficulty = 1;
  maxDifficulty = 10;
  query = '';
  currentPage = 0;
  pageSize = 20;

  ngOnInit(): void {
    this.filterExercises();
  }

  updateMinDifficulty(min: number): void {
    if (min > this.maxDifficulty) {
      this.maxDifficulty = min;
    }
    this.minDifficulty = min;
    this.filterExercises();
  }

  updateMaxDifficulty(max: number): void {
    if (max < this.minDifficulty) {
      this.minDifficulty = max;
    }
    this.maxDifficulty = max;
    this.filterExercises();
  }

  updateQuery(query: string): void {
    this.query = query;
    this.filterExercises();
  }

  updateTags(tags: Tag[]): void {
    this.tags = tags;
    this.filterExercises();
  }

  filterExercises(): void {
    this.currentPage = 0;
    this.filteredExercises = this.exercises.filter(exercise => {
      const isWithinDifficultyRange = exercise.difficulty >= this.minDifficulty && exercise.difficulty <= this.maxDifficulty;
      const doesMatchQuery = exercise.name.toLowerCase().includes(this.query.toLowerCase());
      const hasTags = this.tags.every(tag => exercise.tags.some(exerciseTag => tag.id === exerciseTag.id));
      return isWithinDifficultyRange && doesMatchQuery && hasTags;
    });
    this.calculateShownExercises();
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.calculateShownExercises();
  }

  calculateShownExercises(): void {
    this.shownExercises = this.filteredExercises.slice(this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);
  }
}
