import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarpetComponent } from './carpet/carpet.component';
import { ChoreographiesComponent } from './choreographies/choreographies.component';
import { ChoreographyComponent } from './choreography/choreography.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { FrameManagerComponent } from './frame-manager/frame-manager.component';
import { MenuService } from './menu.service';
import { PeopleComponent } from './people/people.component';
import { ProfileComponent } from './profile/profile.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EightCounterComponent } from './eight-counter/eight-counter.component';
import { IosInstallService } from './ios-install.service';
import { MatMenuModule } from '@angular/material/menu';
import { TwoGroupComponent } from './choreography/groups/two-group/two-group.component';
import { ThreeGroupComponent } from './choreography/groups/three-group/three-group.component';
import { FourGroupComponent } from './choreography/groups/four-group/four-group.component';
import { FiveGroupComponent } from './choreography/groups/five-group/five-group.component';
import { ChoreographyService } from './choreography.service';
import { GroupPersonSelectorComponent } from './choreography/groups/group-options/group-person-selector.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonPipe } from './person-pipe.pipe';
import { PeopleService } from './people.service';
import { ChoreographyPersonPipe } from './choreography-person-pipe.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChoreographyContentNameDialogComponent } from './frame-manager/choreography-content-name-dialog/choreography-content-name-dialog.component';
import { SaveChoreographyDialogComponent } from './frame-manager/save-choreography-dialog/save-choreography-dialog.component';
import { LoadChoreographyDialogComponent } from './frame-manager/load-choreography-dialog/load-choreography-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { SingleAcrobaticPageComponent } from './acrobatics/single-acrobatic-page/single-acrobatic-page.component';
import { AcrobaticsComponent } from './acrobatics/acrobatics.component';
import { ShowAcrobaticComponent } from './acrobatics/show-acrobatic/show-acrobatic.component';
import { ExercisesListingComponent } from './exercises-listing/exercises-listing.component';
import { EllipsisPipe } from './ellipsis.pipe';
import { TagsComponent } from './tags/tags.component';
import { MatChipsModule } from '@angular/material/chips';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ModifyExerciseComponent } from './modify-exercise/modify-exercise.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { SortInputComponent } from './sort-input/sort-input.component';
import { CustomPaginatorIntl } from './paginator-intl';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { ExercisesPlanningComponent } from './exercises-planning/exercises-planning.component';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

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
    ChoreographyContentNameDialogComponent,
    ChoreographiesComponent,
    AboutComponent,
    SideMenuComponent,
    EightCounterComponent,
    TwoGroupComponent,
    ThreeGroupComponent,
    FourGroupComponent,
    FiveGroupComponent,
    GroupPersonSelectorComponent,
    PersonPipe,
    ChoreographyPersonPipe,
    SaveChoreographyDialogComponent,
    LoadChoreographyDialogComponent,
    PageNotFoundComponent,
    AcrobaticsComponent,
    SingleAcrobaticPageComponent,
    ShowAcrobaticComponent,
    ExercisesListingComponent,
    EllipsisPipe,
    TagsComponent,
    TagsInputComponent,
    ModifyExerciseComponent,
    CreateExerciseComponent,
    EditExerciseComponent,
    SortInputComponent,
    HomeComponent,
    ExercisesPlanningComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
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
    MatChipsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    DragDropModule,
    MatCheckboxModule,
    MatMenuModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    MatTooltipModule,
    SharedComponentsModule,
    MatPaginatorModule,
    SocialLoginModule,
  ],
  providers: [MenuService, IosInstallService, ChoreographyService, PeopleService, {provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}, AuthService, LoggedInGuard, NotLoggedInGuard, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '643585029299-4p9vpkh0tiscrfs1tpvhf8ok0q1v1t60.apps.googleusercontent.com', 
            { scope: 'email', plugin_name: 'Cheerful' }
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1570466090015512')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, ChoreographyContentNameDialogComponent],
})
export class AppModule {}
