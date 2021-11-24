import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleManagerRoutingModule } from './people-manager-routing.module';
import { PeopleManagerComponent } from './people-manager.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PeopleManagerComponent],
  imports: [
    CommonModule,
    PeopleManagerRoutingModule,
    SharedComponentsModule,
    MatListModule,
    MatIconModule,
  ],
})
export class PeopleManagerModule {}
