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
import { AccountService } from 'src/app/core/account-service/account.service';
import { PetitionsByOwnerInput } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';

import { Result } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { PetitionService } from '../petition/exports';

@Injectable()
export class GetPetitionsCommitteeService {
  public error$: Observable<string | undefined>;
  public success$: Observable<BufferPetition | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<BufferPetition>>;
  private submit$: ReplaySubject<PetitionsByOwnerInput> = new ReplaySubject();
  private cursor!: string | undefined;

  constructor(
    private _petitionLogic: PetitionService,
    private _loggingService: LoggingService,
    private _accountService: AccountService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionLogic.getCommitteePetitions(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        this._loggingService.log(value);
        this.cursor = value?.cursor;
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
  /** This method begins the process of obtaining a committee's petitions
  @param data: FilterData type: request filtering criteria
  */
  getPetitions(data: PetitionsByOwnerInput) {
    data.owner = this._accountService.currentUser?.attributes.sub ?? '';
    data.cursor = this.cursor;
    this.submit$.next(data);
  }
}
