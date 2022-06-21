import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Exercise } from '../exercises/exercises.component';
import { SortOption } from '../sort-input/sort-input.component';
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

  sortedExercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  shownExercises: Exercise[] = [];
  tags: Tag[] = [];

  minDifficulty = 1;
  maxDifficulty = 10;
  query = '';
  currentPage = 0;
  pageSize = 20;
  currentSortBy = 'name';
  
  sortOptions: SortOption[] = [
    { name: 'NAME', value: 'name' },
    { name: 'DIFFICULTY', value: 'difficulty' },
    { name: 'EMAN', value: 'eman' },
    { name: 'YTLUCIFFID', value: 'ytluciffid' }
  ];

  ngOnInit(): void {
    this.filterExercises();
    this.sortExercises(this.currentSortBy);
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
    this.sortExercises(this.currentSortBy);
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.calculateShownExercises();
  }

  calculateShownExercises(): void {
    this.shownExercises = this.sortedExercises.slice(this.currentPage * this.pageSize, this.currentPage * this.pageSize + this.pageSize);
  }

  sortExercises(sortBy: string): void {
    if (sortBy === 'name') {
      this.sortedExercises = this.filteredExercises.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'difficulty') {
      this.sortedExercises = this.filteredExercises.sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortBy === 'eman') {
      this.sortedExercises = this.filteredExercises.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'ytluciffid') {
      this.sortedExercises = this.filteredExercises.sort((a, b) => b.difficulty - a.difficulty);
    }

    this.calculateShownExercises();
  }

  sortMethod(sortBy: string): void {
    this.currentSortBy = sortBy;
    this.filterExercises();
  }
}
