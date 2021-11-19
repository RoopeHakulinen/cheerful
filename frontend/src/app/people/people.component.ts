import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoreographyPerson } from '../choreography';
import { Person } from '../people';
import { PeopleService } from '../people.service';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, startWith, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  @Input()
  people: ChoreographyPerson[] = [];

  @Output()
  add = new EventEmitter<Person>();
  @Output()
  remove = new EventEmitter<Person>();

  filterNamesControl = new FormControl();
  filteredOptions!: Observable<Person[]>;

  constructor(
    private peopleService: PeopleService,
    private toastService: ToastService,
    private translate: TranslateService
  ) {}

  get availablePeopleToAdd(): Observable<Person[]> {
    return this.peopleService.getPeople().pipe(
      filter((queryOutput) => queryOutput.status === 'success'),
      map((queryOutput) =>
        queryOutput.data!.filter((person) =>
          this.people.some(
            (choreographyPerson) => person.id === choreographyPerson.person.id
          )
        )
      )
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.filterNamesControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterNames(value))
    );
  }

  filterNames(value: string): Observable<Person[]> {
    const filterValue = value.toLowerCase();
    return this.availablePeopleToAdd.pipe(
      map((people) => people.filter((person) => person.name.includes(value)))
    );
  }

  addPerson(person: Person): void {
    this.add.emit(person);
    this.filterNamesControl.setValue('');
    this.toastService.createToastRaw(
      `${this.translate.instant('PEOPLE.PERSON_ADDED')}: ${name}`
    );
  }
}
