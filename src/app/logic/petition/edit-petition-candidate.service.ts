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
import { CandidatePetition } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';

import { CandidatePetitionData, Result } from 'src/app/shared/models/exports';
import { PetitionService } from './exports';

@Injectable()
export class EditPetitionCandidateService {
  public error$: Observable<string | undefined>;
  public success$: Observable<CandidatePetition | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<CandidatePetition>>;
  private submit$: Subject<CandidatePetition> = new Subject();

  constructor(
    private _editPetitionService: PetitionService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) =>
        this._editPetitionService.editPetitionCandidate(data)
      ),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => this._loggingService.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error),
      tap((value) => this._loggingService.log(value)),
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

  /** This method begins the process of edition of a candidate type petition
  @param value: CandidatePetition type: contains the data of a candidate type petition provided by the user
  */
  editCandidatePetition(value: CandidatePetition) {
    this.submit$.next(value);
  }
}
