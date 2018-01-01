import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class HistoryService {
  history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.url);
      }
    });
  }

  hasHistory() {
    return this.history.length > 1;
  }

  pop() {
    return this.history.pop();
  }
}
