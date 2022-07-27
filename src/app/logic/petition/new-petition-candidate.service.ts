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
import { CandidatePetitionData, Result } from 'src/app/shared/models/exports';

@Injectable({
  providedIn: 'root',
})
export class NewPetitionCandidateService {
  public error$: Observable<Result<CandidatePetitionData>>;
  public success$: Observable<Result<CandidatePetitionData>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<CandidatePetitionData>>;
  private submit$: Subject<CandidatePetitionData> = new Subject();

  constructor(private _petitionService: PetitionService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._petitionService.newPetitionCandidate(data)),
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

  set formGroupValue(value: CandidatePetitionData) {
    this.submit$.next(value);
  }
}
