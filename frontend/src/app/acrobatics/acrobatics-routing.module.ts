import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcrobaticsComponent } from './acrobatics.component';
import { SingleAcrobaticPageComponent } from './single-acrobatic-page/single-acrobatic-page.component';

const routes: Routes = [
  { path: ':id', component: SingleAcrobaticPageComponent },
  { path: '', component: AcrobaticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcrobaticsRoutingModule {}
