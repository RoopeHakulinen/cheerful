import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercises-planning',
  templateUrl: './exercises-planning.component.html',
  styleUrls: ['./exercises-planning.component.scss']
})
export class ExercisesPlanningComponent {

  selectedExercises: Exercise[] = [];

  drop(event: CdkDragDrop<Exercise[]>) {
    console.log(event.container.data, event.currentIndex, event.previousIndex, event.previousContainer.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor() { }
}
