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
import { PetitionService } from 'src/app/features/new-petition/petition-service/petition.service';
import { Result } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Injectable({
  providedIn: 'root',
})
export class GetPetitionsService {
  public error$: Observable<Result<ResponsePetition[]>>;
  public success$: Observable<Result<ResponsePetition[]>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<ResponsePetition[]>>;
  private submit$: Subject<void> = new Subject();

  constructor(private _petitionLogic: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionLogic.getPetitions()),
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

  getPetitions() {
    this.submit$.next();
  }
}
