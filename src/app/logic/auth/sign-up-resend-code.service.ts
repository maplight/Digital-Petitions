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
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { SignUpConfirmationCode } from 'src/app/shared/models/auth/sign-up-confirmation-code';
import { Result } from 'src/app/shared/models/exports';

@Injectable({
  providedIn: 'root',
})
export class SignUpResendCodeService {
  public error$: Observable<string | undefined>;
  public success$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<string> = new Subject();

  constructor(
    private _accountLogic: AccountService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._accountLogic.resendSignUp(data)),
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

  /** This method begins the process of forwarding of the confirmation code for the validation of the registration of a committee user.The user receives a new code in the contact email provided
  @param value: Registration email supplied by the user
  */
  formGroupValue(value: string) {
    this.submit$.next(value);
  }
}
