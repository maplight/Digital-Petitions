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
import {
  CandidatePetition,
  CandidatePetitionInput,
} from 'src/app/core/api/API';

import { CandidatePetitionData, Result } from 'src/app/shared/models/exports';
import { PetitionService } from './exports';

@Injectable()
export class NewPetitionCandidateService {
  public error$: Observable<Result<CandidatePetition>>;
  public success$: Observable<Result<CandidatePetition>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<CandidatePetition>>;
  private submit$: Subject<CandidatePetitionInput> = new Subject();

  constructor(private _petitionService: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionService.newCandidatePetition(data)),
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

  /** This method begins the process of adding a candidate type petition
  @param value: CandidatePetitionInput type: Contains the data of a candidate type petition provided by the user
  */
  newCandidatePetition(value: CandidatePetitionInput) {
    this.submit$.next(value);
  }
}
