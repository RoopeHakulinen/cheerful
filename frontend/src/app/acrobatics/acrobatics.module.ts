import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrobaticsRoutingModule } from './acrobatics-routing.module';
import { AcrobaticsComponent } from './acrobatics.component';
import { ShowAcrobaticComponent } from './show-acrobatic/show-acrobatic.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SingleAcrobaticPageComponent } from './single-acrobatic-page/single-acrobatic-page.component';

@NgModule({
  declarations: [AcrobaticsComponent, ShowAcrobaticComponent, SingleAcrobaticPageComponent],
  imports: [CommonModule, AcrobaticsRoutingModule, MatIconModule, SharedComponentsModule],
})
export class AcrobaticsModule {}
