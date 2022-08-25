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

import { FilterData, Result } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionService } from '../petition/exports';

@Injectable()
export class GetPetitionsCommitteeService {
  public error$: Observable<Result<BufferPetition>>;
  public success$: Observable<Result<BufferPetition>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<BufferPetition>>;
  private submit$: Subject<{ id: string; cursor?: string }> = new Subject();

  constructor(private _petitionLogic: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionLogic.getCommitteePetitions(data)),
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
  /** This method begins the process of obtaining a committee's petitions
  @param value: FilterData type: request filtering criteria
  */
  getPetitions(data: { id: string; cursor?: string }) {
    this.submit$.next(data);
  }
}
