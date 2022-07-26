import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput, refreshQuery } from 'rx-query';
import { Exercise, ExerciseToBeCreated } from './exercises/exercises.component';

@Injectable()
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getExercises(): Observable<QueryOutput<Exercise[]>> {
    return query('exercises', () => this.http.get<Exercise[]>('/api/exercises'));
  }

  createExercise(exercise: ExerciseToBeCreated): Observable<Exercise> {
    return this.http.post<Exercise>(`/api/exercises`, exercise).pipe(tap(() => this.refreshExercises()));
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`/api/exercises`, exercise).pipe(tap(() => this.refreshExercises()));
  }

  deleteExerciseById(id: number): Observable<Exercise> {
    return this.http.delete<Exercise>(`/api/exercises/${id}`).pipe(tap(() => this.refreshExercises()));
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`/api/exercises/${id}`);
  }

  refreshExercises(): void {
    refreshQuery('exercises');
  }
}
