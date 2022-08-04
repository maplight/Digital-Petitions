import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';

import { IssuePetitionData, Result } from 'src/app/shared/models/exports';
import { PetitionService } from './exports';

@Injectable()
export class EditPetitionIssueService {
  public error$: Observable<Result<IssuePetitionData>>;
  public success$: Observable<Result<IssuePetitionData>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<IssuePetitionData>>;
  private submit$: Subject<IssuePetitionData> = new Subject();

  constructor(private _editPetitionService: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._editPetitionService.editPetitionIssue(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map((v) => true),
        tap(() => console.log('start'))
      ),
      end$.pipe(
        map((v) => false),
        tap(() => console.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }

  set formGroupValue(value: IssuePetitionData) {
    this.submit$.next(value);
  }
}
