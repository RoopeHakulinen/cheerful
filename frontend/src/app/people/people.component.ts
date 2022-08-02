import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoreographyPerson } from '../choreography';
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../toast.service';

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

  constructor(private peopleService: PeopleService, private toastService: ToastService, private translate: TranslateService) {
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
    this.toastService.createToastRaw(`${this.translate.instant('PEOPLE.PERSON_ADDED')}: ${name}`);
  }
}
