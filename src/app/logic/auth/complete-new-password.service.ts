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
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { Result } from 'src/app/shared/models/exports';
import { __values } from 'tslib';

@Injectable()
export class CompleteNewPasswordService {
  public error$: Observable<string>;
  public success$: Observable<CognitoUserFacade>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<CognitoUserFacade>>;
  private submit$: Subject<string> = new Subject();

  constructor(
    private _accountLogic: AccountService,
    private _logger: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((newPassword) =>
        this._accountLogic.completeNewPassword(newPassword)
      ),
      shareReplay(1)
    );

    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map(({ result }) => result!),
      tap((result) => this._logger.log(result)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error!),
      tap((value) => this._logger.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map((_) => true),
        tap(() => this._logger.log('start'))
      ),
      end$.pipe(
        map((_) => false),
        tap(() => this._logger.log('end'))
      )
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this.submit$.complete();
  }

  setNewPassword(password: string) {
    this.submit$.next(password);
  }
}
