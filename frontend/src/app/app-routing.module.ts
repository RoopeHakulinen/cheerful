import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoreographyComponent } from './choreography/choreography.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ChoreographyComponent
  },
  {
    path: 'choreography',
    component: ChoreographyComponent
  },
  {
    path: 'exercises',
    component: ExercisesComponent
  },
  {
    path: 'exercises/:id',
    component: ExerciseComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
