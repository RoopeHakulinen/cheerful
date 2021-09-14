import {Injectable} from '@angular/core';

@Injectable()
export class MenuService {
  opened = false;

  constructor() {
  }

  toggle() {
    this.opened = !this.opened;
  }

  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  isOpen() {
    return this.opened;
  }
}
