import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { PetitionsByTypeInput } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';

import { FilterData, Result } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionService } from './exports';

@Injectable()
export class GetPublicPetitionsActiveService {
  public error$: Observable<string | undefined>;
  public success$: Observable<BufferPetition | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<BufferPetition>>;
  private submit$: ReplaySubject<PetitionsByTypeInput> = new ReplaySubject();
  constructor(
    private _petitionLogic: PetitionService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) =>
        this._petitionLogic.getAnonymousActivePetitions(data)
      ),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        this._loggingService.log(value);
      }),

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
        tap(() => this._loggingService.log('start'))
      ),
      end$.pipe(
        map((v) => false),
        tap(() => this._loggingService.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }
  /** This method begins the process of obtaining inactive petitions
  @param data: FilterData type: request filtering criteria
  */
  getPetitionsAnonymous(data: PetitionsByTypeInput) {
    this.submit$.next(data);
  }
}
