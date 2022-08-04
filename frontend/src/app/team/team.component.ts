import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { map, startWith, tap } from 'rxjs/operators';
import { Person } from '../person';
import { UserService } from '../user.service';
import { PersonService } from '../person.service';
import { User } from '../user';
import { QueryOutput } from 'rx-query';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team$!: Observable<QueryOutput<Team>>;

  newPeople: Person[] = []; // TODO (Person | string)[] = [];
  newUsers: User[] = [];

  userControl = new FormControl('');
  personControl = new FormControl('');

  people: readonly Person[] = [];
  users: readonly User[] = [];

  filteredUserOptions!: Observable<User[]>;
  filteredPersonOptions!: Observable<Person[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private userService: UserService,
    private dialog: MatDialog,
    private personService: PersonService
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.team$ = this.teamService.getTeamById(id).pipe(tap(console.log));
  }

  ngOnInit(): void {
    // TODO Make reactive
    this.userService.getUsers().subscribe(queryOutput => {
      if (queryOutput.status === 'success') {
        this.users = queryOutput.data!;
      }
    });

    this.personService.getPeople().subscribe(queryOutput => {
      if (queryOutput.status === 'success') {
        this.people = queryOutput.data!;
      }
    });

    this.filteredUserOptions = this.userControl.valueChanges.pipe(
      startWith(''),
      map(value => this.userFilter(value || '')),
    );

    this.filteredPersonOptions = this.personControl.valueChanges.pipe(
      startWith(''),
      map(value => this.personFilter(value || '')),
    );
  }

  private userFilter(value: string | User): User[] {
    if (typeof value !== 'string') {
      return this.users as User[]; // TODO
    }
    const filterValue = value.toLowerCase();
    return this.users
      // TODO Filter out the current team members.
      .filter(user => this.newUsers.every(newUser => newUser.id !== user.id))
      .filter(user => `${user.firstName} ${user.lastName}`.toLowerCase().includes(filterValue));
  }

  private personFilter(value: string): Person[] {
    if (typeof value !== 'string') {
      return this.people as Person[]; // TODO
    }
    const filterValue = value.toLowerCase();
    return this.people
      .filter(person => this.newPeople.every(newPerson => newPerson.name !== person.name))
      .filter(person => person.name.toLowerCase().includes(filterValue));
  }

  addPerson(person: Person): void {
    this.newPeople.push(person);
    this.personControl.setValue('');
  }

  addUser(user: User): void {
    this.newUsers.push(user);
    this.userControl.setValue('');
  }

  deleteUser(user: User): void {
    // TODO Delete user from team
    console.log("deleteUser");
  }

  deleteNewUser(newUser: User): void {
    this.newUsers = this.newUsers.filter(user => user.id !== newUser.id);
  }

  deletePerson(person: any): void {
    // TODO Delete person from team
    console.log("deletePerson");
  }

  deleteNewPerson(newPerson: Person): void {
    this.newPeople = this.newPeople.filter(person => person.name !== newPerson.name);
  }

  saveTeam(team: Team): void {
    this.teamService.updateTeam({ ...team, users: [...team.users, ...this.newUsers], people: [...team.people, ...this.newPeople] })
      .subscribe(() => {
        this.newPeople = [];
        this.newUsers = [];
      });
  }

  openPersonDialog(): void {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: 'fit-content',
      data: {firstName: '', lastName: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        return;
      }
      // TODO: Math.random ID and you can make person without name if you remove disabled through elements.
      this.newPeople.push({ id: Math.floor(Math.random() * 1000), name: `${result.firstName} ${result.lastName}` });
    });
  }
}
