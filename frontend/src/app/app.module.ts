import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AboutComponent} from './about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarpetComponent} from './carpet/carpet.component';
import {ChoreographiesComponent} from './choreographies/choreographies.component';
import {ChoreographyComponent} from './choreography/choreography.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ExerciseComponent} from './exercise/exercise.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {FrameManagerComponent} from './frame-manager/frame-manager.component';
import {MenuService} from './menu.service';
import {PeopleComponent} from './people/people.component';
import {ProfileComponent} from './profile/profile.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {ServiceWorkerModule} from '@angular/service-worker';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    ChoreographyComponent,
    ExercisesComponent,
    ExerciseComponent,
    ProfileComponent,
    CarpetComponent,
    PeopleComponent,
    FrameManagerComponent,
    ConfirmDialogComponent,
    ChoreographiesComponent,
    AboutComponent,
    ToolbarComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    // ServiceWorkerModule.register('/cheerful/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    // DragulaModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    DragDropModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule {
}
