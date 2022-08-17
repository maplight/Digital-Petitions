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
import { IssuePetition, IssuePetitionInput } from 'src/app/core/api/API';

import { IssuePetitionData, Result } from 'src/app/shared/models/exports';
import { PetitionService } from './exports';

@Injectable()
export class NewPetitionIssueService {
  public error$: Observable<Result<IssuePetition>>;
  public success$: Observable<Result<IssuePetition>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<IssuePetition>>;
  private submit$: Subject<IssuePetitionInput> = new Subject();

  constructor(private _petitionService: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionService.newIssuePetition(data)),
      shareReplay(1)
    );

    const [success$, error$] = partition(
      this.result$,
      (value) => !!value.result
    );

    this.success$ = success$.pipe(shareReplay(1));

    this.error$ = error$.pipe(shareReplay(1));

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

  setIssuePetition(value: IssuePetitionData) {
    this.submit$.next(value);
  }
}
