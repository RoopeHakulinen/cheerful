import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  title?: string;

  @Input()
  backUrl?: string;

  constructor(public menuService: MenuService, private router: Router) {
  }

  ngOnInit() {
  }
}
