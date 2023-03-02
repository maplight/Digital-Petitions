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
import { Signature, TargetSignatureInput } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { Result } from 'src/app/shared/models/exports';
import { SignatureService } from './signature.service';

@Injectable()
export class ApproveSignatureService {
  public error$: Observable<string | undefined>;
  public success$: Observable<Signature | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<Signature>>;
  private submit$: Subject<TargetSignatureInput> = new Subject();

  constructor(
    private _signatureService: SignatureService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._signatureService.approveSignature(data)),
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
      tap((value) => console.log('ERROR', value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map((v) => true),
        tap(() => this._loggingService.log('start approve'))
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

  approveSignature(id: TargetSignatureInput) {
    this.submit$.next(id);
  }
}
