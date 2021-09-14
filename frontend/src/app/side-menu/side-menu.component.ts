import {Component, OnInit} from '@angular/core';
import {MenuService} from '../menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(public menuService: MenuService) {
  }

  ngOnInit() {
  }

}
