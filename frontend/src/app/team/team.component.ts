import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { map, startWith } from 'rxjs/operators';
import { Person } from '../people';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team$!: Observable<Team>;

  newPeople: Person[] = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.team$ = this.teamService.getTeamById(id);
  }

  deleteFromTeam(): void {
    console.log("deleteFromTeam");
  }

  saveTeam(team: Team): void {
    this.teamService.updateTeam(team)
      .subscribe();
  }

}
