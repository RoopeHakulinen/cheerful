import { Injectable } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Choreography } from './choreography';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput } from 'rx-query';
import { SaveChoreographyDialogComponent } from './frame-manager/save-choreography-dialog/save-choreography-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './toast.service';

@Injectable()
export class ChoreographyService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  getChoreographies(): Observable<QueryOutput<Choreography[]>> {
    return query('choreographies', () =>
      this.http.get<Choreography[]>(`/api/choreographies/`)
    );
  }

  getChoreographiesById(id: number): Observable<QueryOutput<Choreography>> {
    return query(
      'choreography',
      id,
      (_id) => this.http.get<Choreography>(`/api/choreographies/${_id}`),
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  }

  updateChoreography(choreography: Choreography): void {
    const dialogRef = this.dialog.open(SaveChoreographyDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result === true),
        switchMap(() => {
          return this.http.put<Choreography>(
            `/api/choreographies/${choreography.id}`,
            choreography
          );
        })
      )
      .subscribe(() =>
        this.toastService.createToast('FRAME_MANAGER.CHOREOGRAPHY_SAVED')
      );
  }
}
