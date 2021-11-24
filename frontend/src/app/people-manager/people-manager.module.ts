import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleManagerRoutingModule } from './people-manager-routing.module';
import { PeopleManagerComponent } from './people-manager.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [PeopleManagerComponent],
  imports: [
    CommonModule,
    PeopleManagerRoutingModule,
    SharedComponentsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
  ],
})
export class PeopleManagerModule {}
