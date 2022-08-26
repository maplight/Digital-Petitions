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
import { SignaturesData } from 'src/app/shared/models/signatures/signatures-data';
import { SignatureService } from './signature.service';

@Injectable()
export class GetSignaturesService {
  public error$: Observable<Result<SignaturesData[]>>;
  public success$: Observable<Result<SignaturesData[]>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<SignaturesData[]>>;
  private submit$: Subject<FilterData[]> = new Subject();

  constructor(private _signatureService: SignatureService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._signatureService.getSignatures(data)),
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

  /** This method begins the process of obtaining a petitions
  @param id: The requested request ID
  */

  getSignatures(filter: FilterData[]) {
    this.submit$.next(filter);
  }
}
