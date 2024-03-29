import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Exercise } from '../exercises/exercises.component';
import { SortOption } from '../sort-input/sort-input.component';
import { Tag } from '../tags/tags.component';

@Component({
  selector: 'app-exercises-listing',
  templateUrl: './exercises-listing.component.html',
  styleUrls: ['./exercises-listing.component.scss']
})
export class ExercisesListingComponent implements OnInit, OnChanges {

  @Input()
  exercises!: Readonly<Exercise[]>;

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exercises) {
      this.filterExercises();
    }
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
