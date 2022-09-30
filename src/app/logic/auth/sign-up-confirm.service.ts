import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
import { SignUpConfirmationCode } from 'src/app/shared/models/auth/sign-up-confirmation-code';
import { ConfirmationCode, Result } from 'src/app/shared/models/exports';

@Injectable()
export class SignUpConfirmService {
  public error$: Observable<string | undefined>;
  public success$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<SignUpConfirmationCode> = new Subject();

  constructor(
    private _accountLogic: AccountService,
    private _loggingService: LoggingService,
    private _router: Router
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._accountLogic.signUpConfirm(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        this._loggingService.log(value);
        this._router.navigate(['/committee/new-petition']);
      }),
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

  /** This method begins the registration process of a new committee user
  @param value: Confirmation code received by the user in the contact email by providing
  */
  SignUpConfirmationCode(value: SignUpConfirmationCode) {
    this.submit$.next(value);
  }
}
