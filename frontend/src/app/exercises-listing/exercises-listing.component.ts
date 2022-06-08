import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercises-listing',
  templateUrl: './exercises-listing.component.html',
  styleUrls: ['./exercises-listing.component.scss']
})

export class ExercisesListingComponent implements OnInit {

  @Input()
  exercises!: Exercise[];

  filteredExercises: Exercise[] = [];

  minDifficulty = 1;
  maxDifficulty = 10;
  query = '';

  ngOnInit(): void {
    this.filterExercises();
  }

  updateMinDifficulty(min: number): void {
    if(min > this.maxDifficulty) {
      this.maxDifficulty = min;
    }
    this.minDifficulty = min;
    this.filterExercises();
  }

  updateMaxDifficulty(max: number): void {
    if(max < this.minDifficulty) {
      this.minDifficulty = max;
    }
    this.maxDifficulty = max;
    this.filterExercises();
  }

  updateQuery(query: string): void {
    this.query = query;
    this.filterExercises();
  }

  filterExercises(): void {
    this.filteredExercises = this.exercises.filter(exercise => {
      const isWithinDifficultyRange = exercise.difficulty >= this.minDifficulty && exercise.difficulty <= this.maxDifficulty;
      const doesMatchQuery = exercise.name.toLowerCase().includes(this.query.toLowerCase());
      return isWithinDifficultyRange && doesMatchQuery;
    });
  }
}
