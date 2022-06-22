import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AcrobaticsComponent } from './acrobatics/acrobatics.component';
import { SingleAcrobaticPageComponent } from './acrobatics/single-acrobatic-page/single-acrobatic-page.component';
import { ChoreographiesComponent } from './choreographies/choreographies.component';
import { ChoreographyComponent } from './choreography/choreography.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HomeComponent } from './home/home.component';
import { ModifyExerciseComponent } from './modify-exercise/modify-exercise.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'app',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'choreographies'
      },
      {
        path: 'choreographies',
        component: ChoreographiesComponent,
      },
      {
        path: 'choreographies/:id',
        component: ChoreographyComponent,
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
      },
      {
        path: 'exercises/new',
        component: CreateExerciseComponent,
      },
      {
        path: 'exercises/:id',
        component: ExerciseComponent,
      },
      {
        path: 'exercises/:id/edit',
        component: EditExerciseComponent,
      },
      {
        path: 'my-profile',
        component: ProfileComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'acrobatics',
        component: AcrobaticsComponent,
      },
      {
        path: 'acrobatics/:id',
        component: SingleAcrobaticPageComponent,
      },
      {
        path: '**',
        redirectTo: 'choreographies',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
