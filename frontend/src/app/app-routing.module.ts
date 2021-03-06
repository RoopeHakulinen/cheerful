import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChoreographiesComponent } from './choreographies/choreographies.component';
import { ChoreographyComponent } from './choreography/choreography.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ChoreographiesComponent
  },
  {
    path: 'choreographies',
    component: ChoreographiesComponent
  },
  {
    path: 'choreographies/:id',
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
    path: 'my-profile',
    component: ProfileComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
