import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  title: string;

  constructor(public menuService: MenuService, private router: Router, private historyService: HistoryService) {
  }

  ngOnInit() {
  }

  isBackAvailable() {
    return this.historyService.hasHistory();
  }

  back() {
    const url = this.historyService.pop();
    this.router.navigateByUrl(url);
  }
}
