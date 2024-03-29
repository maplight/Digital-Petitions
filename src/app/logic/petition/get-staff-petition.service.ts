import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  shareReplay,
  tap,
} from 'rxjs';
import { LoggingService } from 'src/app/core/logging/loggin.service';

import { Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionService } from './exports';

@Injectable()
export class GetStaffPetitionService {
  public error$: Observable<string | undefined>;
  public success$: Observable<ResponsePetition | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<ResponsePetition>>;
  private submit$: ReplaySubject<string> = new ReplaySubject();

  constructor(
    private _petitionService: PetitionService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionService.getStaffPetition(data)),
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

  /** This method begins the process of obtaining a petitions
  @param id: The requested request ID
  */

  getPetition(id: string) {
    this.submit$.next(id);
  }
}
