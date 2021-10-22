import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoreographyPerson } from '../choreography';
import { Person } from '../people';
import { PeopleService } from '../people.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  @Input()
  people: ChoreographyPerson[] = [];

  @Output()
  add = new EventEmitter<number>();
  @Output()
  remove = new EventEmitter<number>();

  filterNamesControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.filterNamesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterNames(value))
      );
  }

  constructor(private peopleService: PeopleService, private snackBar: MatSnackBar, private translate: TranslateService) {
  }

  get availablePeopleToAdd(): Person[] {
    return this.peopleService.getPeopleForChoreography(1)
      .filter(person => !this.people.find(choreographyPerson => choreographyPerson.personId === person.id));
  }

  filterNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availablePeopleToAdd.map(person => person.name)
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  addPerson(name: string): void {
    this.add.emit(this.availablePeopleToAdd.find(person => person.name === name)!.id);
    this.filterNamesControl.setValue('');
    this.snackBar.open(`${this.translate.instant('PEOPLE.PERSON_ADDED')}: ${name}`, this.translate.instant('COMMON.CLOSE'), {
      duration: 2000
    });
  }
}
