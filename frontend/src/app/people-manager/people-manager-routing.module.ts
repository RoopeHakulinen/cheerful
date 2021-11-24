import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleManagerComponent } from './people-manager.component';

const routes: Routes = [{ path: '', component: PeopleManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleManagerRoutingModule {}
