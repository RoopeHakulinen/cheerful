import { Component } from '@angular/core';
import { ChoreographyService } from '../choreography.service';
import { Choreography } from '../choreography';
import { Observable } from 'rxjs';
import { ToastService } from '../toast.service';
import { QueryOutput, refreshQuery } from 'rx-query';

@Component({
  selector: 'app-choreographies',
  templateUrl: './choreographies.component.html',
  styleUrls: ['./choreographies.component.scss'],
})
export class ChoreographiesComponent {
  choreographies$: Observable<QueryOutput<Choreography[]>>;

  constructor(public choreographyService: ChoreographyService, private toastService: ToastService) {
    this.choreographies$ = this.choreographyService.getChoreographies();
  }

  createNewChoreography(): void {
    this.choreographyService.createChoreography().subscribe((choreography) => {
      refreshQuery('choreographies');
      return this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_CREATED');
    });
  }

  deleteChoreography(id: number): void {
    this.choreographyService.deleteChoreographyById(id).subscribe((choreography) => {
      refreshQuery('choreographies');
      return this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_DELETED');
    });
  }
}
