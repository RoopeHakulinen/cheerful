import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercises-listing',
  templateUrl: './exercises-listing.component.html',
  styleUrls: ['./exercises-listing.component.scss']
})
export class ExercisesListingComponent {

  @Input()
  exercises!: Exercise[];

}
