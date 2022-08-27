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
import { Result } from 'src/app/shared/models/exports';
import { PetitionService } from './petition.service';

@Injectable()
export class ApprovePetitionService {
  public error$: Observable<string | undefined>;
  public success$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<{
    data: { deadline: string; signatures: string };
    id: string;
  }> = new Subject();

  constructor(private _petitionService: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionService.approvePetition(data)),
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

  /** This method begins the process of withdrawal of a petition
  @param id: ID of the petition to withdraw
  */

  approvePetition(data: { deadline: string; signatures: string }, id: string) {
    this.submit$.next({ data: data, id: id });
  }
}
