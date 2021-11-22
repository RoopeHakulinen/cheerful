import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrobaticsRoutingModule } from './acrobatics-routing.module';
import { AcrobaticsComponent } from './acrobatics.component';
import { SingleAcrobaticComponent } from './single-acrobatic/single-acrobatic.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SingleAcrobaticPageComponent } from './single-acrobatic-page/single-acrobatic-page.component';

@NgModule({
  declarations: [AcrobaticsComponent, SingleAcrobaticComponent, SingleAcrobaticPageComponent],
  imports: [CommonModule, AcrobaticsRoutingModule, MatIconModule, TranslateModule, SharedComponentsModule],
})
export class AcrobaticsModule {}
