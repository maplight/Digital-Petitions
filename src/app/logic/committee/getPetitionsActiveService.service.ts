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
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { PetitionService } from '../petition/exports';

@Injectable()
export class GetPetitionsActiveService {
  public error$: Observable<string | undefined>;
  public success$: Observable<ResponsePetition[] | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<ResponsePetition[]>>;
  private submit$: Subject<FilterData[]> = new Subject();

  constructor(private _petitionLogic: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionLogic.getActivePetitions(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error),
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

  /** This method begins the process of obtaining active petitions
  @param value: FilterData type: request filtering criteria
  */
  getPetitions(value: FilterData[]) {
    this.submit$.next(value);
  }
}
