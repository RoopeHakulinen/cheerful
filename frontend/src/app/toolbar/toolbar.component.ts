import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnChanges {
  @Input()
  title?: string;

  @Input()
  backUrl?: string;

  @Output()
  changeChoreographyName = new EventEmitter<string>();

  isEditingOn: boolean = false;
  choreographyTitle!: string;

  constructor(public menuService: MenuService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title) {
      this.choreographyTitle = this.title!;
    }
  }

  editName(): void {
    this.isEditingOn = !this.isEditingOn;
    if (!this.isEditingOn) {
      this.changeChoreographyName.emit(this.choreographyTitle);
    } else {
      setTimeout(() => {
        document.getElementById('input')!.focus();
      }, 0);
    }
  }

  undoEditing(): void {
    this.isEditingOn = !this.isEditingOn;
    this.choreographyTitle = this.title!;
  }
}
