import { Injectable, OnDestroy } from '@angular/core';
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
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { ConfirmationCode, Result } from 'src/app/shared/models/exports';

@Injectable()
export class ConfirmChangeEmailService implements OnDestroy {
  public error$: Observable<string | undefined>;
  public success$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<ConfirmationCode> = new Subject();

  constructor(
    private _accountLogic: AccountService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._accountLogic.confirmEmailChange(data)),
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
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map((v) => true),
        tap(() => this._loggingService.log('start'))
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

  /** This method begins the process to confirm an email previously changed by the user
  @param value: Confirmation code received by the user in their email
  */
  setConfirmationCode(value: ConfirmationCode) {
    this.submit$.next(value);
  }
}
