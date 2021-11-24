import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent, TranslateModule],
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
  ],
})
export class SharedComponentsModule {}
