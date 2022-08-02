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
import { ExercisesPlanningComponent } from './exercises-planning/exercises-planning.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'app',
    canActivate: [LoggedInGuard],
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
        path: 'exercises/planning',
        component: ExercisesPlanningComponent,
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
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'teams/:id',
        component: TeamComponent,
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
