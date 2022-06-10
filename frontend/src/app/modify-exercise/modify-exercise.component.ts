import { Component } from '@angular/core';
import { exercises, Exercise } from '../exercises/exercises.component';
import { Tag, tags } from '../tags/tags.component';

@Component({
  selector: 'app-modify-exercise',
  templateUrl: './modify-exercise.component.html',
  styleUrls: ['./modify-exercise.component.scss']
})
export class ModifyExerciseComponent {

  tags = tags;
  exercises: Exercise[] = exercises;
  exerciseTags: Tag[] = [];

  difficultyRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  exerciseName = '';
  exerciseDifficulty = 1;
  exerciseDescription = '';

  updateTags(tags: Tag[]): void {
    this.exerciseTags = tags;
  }

  createExercise(): void {
    this.exercises.push({ 
      id: Math.floor(Math.random() * 1000), 
      name: this.exerciseName, 
      description: this.exerciseDescription, 
      difficulty: this.exerciseDifficulty, 
      tags: this.exerciseTags });
  }
}
