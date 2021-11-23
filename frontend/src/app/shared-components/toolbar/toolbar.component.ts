import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input()
  title?: string;

  @Input()
  backUrl?: string;

  constructor(public menuService: MenuService) {}
}
