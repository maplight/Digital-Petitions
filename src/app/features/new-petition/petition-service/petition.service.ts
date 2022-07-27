import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IssuePetitionData, Result } from 'src/app/shared/models/exports';

@Injectable({
  providedIn: 'root',
})
export class PetitionService {
  constructor() {}

  newPetitionIssue(
    data: IssuePetitionData
  ): Observable<Result<IssuePetitionData>> {
    return of({ result: data }).pipe(delay(3000));
  }
}
