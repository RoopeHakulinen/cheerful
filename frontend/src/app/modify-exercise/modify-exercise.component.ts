import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise, ExerciseToBeCreated } from '../exercises/exercises.component';
import { Tag, tags } from '../tags/tags.component';

@Component({
  selector: 'app-modify-exercise',
  templateUrl: './modify-exercise.component.html',
  styleUrls: ['./modify-exercise.component.scss']
})
export class ModifyExerciseComponent {
  @Input()
  exercise!: Exercise | ExerciseToBeCreated;

  @Input()
  buttonKey!: string;

  @Output()
  buttonClick = new EventEmitter<Exercise | ExerciseToBeCreated>();

  tags = tags;
  exerciseTags: Tag[] = [];

  difficultyRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  isValid(): boolean {
    const isNameValid = this.exercise.name.length > 0 && this.exercise.name.length <= 20;
    return isNameValid;
  }

  onSubmit(): void {
    if (!this.isValid()) {
      return;
    }
    this.buttonClick.emit(this.exercise);
  }

  updateTags(tags: Tag[]): void {
    this.exerciseTags = tags;
  }
}
