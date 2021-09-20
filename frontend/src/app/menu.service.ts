import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  opened = false;

  constructor() {
  }

  toggle(): void {
    this.opened = !this.opened;
  }

  close(): void {
    this.opened = false;
  }

  open(): void {
    this.opened = true;
  }

  isOpen(): boolean {
    return this.opened;
  }
}
