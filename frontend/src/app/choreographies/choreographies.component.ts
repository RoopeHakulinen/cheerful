import { Component } from '@angular/core';
import { ChoreographyService } from '../choreography.service';
import { Choreography } from '../choreography';
import { Observable } from 'rxjs';
import { ToastService } from '../toast.service';
import { QueryOutput } from 'rx-query';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss'],
})
export class ChoreographiesComponent {
  user$: Observable<Partial<User>> = this.authService.user;
  myTeams$: Observable<QueryOutput<Team[]>>;

  constructor(
    public choreographyService: ChoreographyService,
    private authService: AuthService,
    private toastService: ToastService,
    private teamService: TeamService,
  ) {
    this.myTeams$ = this.teamService.getMyTeams();
  }

  createNewChoreography(): void {
    this.choreographyService.createChoreography().subscribe((choreography) => {
      return this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_CREATED');
    });
  }

  deleteChoreography(id: number): void {
    this.choreographyService.deleteChoreographyById(id).subscribe((choreography) => {
      return this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_DELETED');
    });
  }
}
