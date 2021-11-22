import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [MatToolbarModule, MatIconModule, SharedComponentsRoutingModule, CommonModule],
})
export class SharedComponentsModule {}
