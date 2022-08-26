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
import { SignatureService } from './signature.service';

@Injectable()
export class ApproveSignatureService {
  public error$: Observable<Result<string>>;
  public success$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<string[]> = new Subject();

  constructor(private _signatureService: SignatureService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._signatureService.approveSignature(data)),
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

  approveSignature(id: string[]) {
    this.submit$.next(id);
  }
}
