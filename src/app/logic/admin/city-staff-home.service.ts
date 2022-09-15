import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  scan,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { PetitionsByTypeInput } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { Result } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { PetitionService } from '../petition/petition.service';

@Injectable()
export class CityStaffHomeService {
  public error$: Observable<string | undefined>;
  public success$: Observable<BufferPetition | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<[Result<BufferPetition>, boolean]>;
  private submit$: ReplaySubject<{
    data: PetitionsByTypeInput;
    reset: boolean;
  }> = new ReplaySubject();
  private cursor!: string | undefined;
  constructor(
    private _petitionLogic: PetitionService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap(({ data, reset }) =>
        this._petitionLogic
          .getCityStaffPetitions(data)
          .pipe(
            map(
              (result) => [result, reset] as [Result<BufferPetition>, boolean]
            )
          )
      ),
      shareReplay(1)
    );

    const [success$, error$] = partition(
      this.result$,
      ([value, _]) => !!value.result
    );

    this.success$ = success$.pipe(
      map(
        ([value, reset]) => [value.result, reset] as [BufferPetition, boolean]
      ),
      scan<[BufferPetition, boolean], BufferPetition>(
        (acc, [value, reset]) => ({
          cursor: value?.cursor,
          items: reset
            ? value?.items
            : [...(acc?.items ?? []), ...(value?.items ?? [])],
        }),
        { items: [] }
      ),
      tap((value) => {
        this._loggingService.log(value);
        this.cursor = value?.cursor;
      }),

      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map(([value, _]) => value.error),
      tap((value) => this._loggingService.log(value)),

      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map(() => true),
        tap(() => console.log('start'))
      ),
      end$.pipe(
        map(() => false),
        tap(() => console.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }
  /** This method begins the process of obtaining inactive petitions
  @param data: PetitionsByTypeInput type: request filtering criteria
  */
  getPetitions(data: PetitionsByTypeInput, reset: boolean = false) {
    data.cursor = reset ? undefined : this.cursor;
    this.submit$.next({ data, reset });
  }
}
