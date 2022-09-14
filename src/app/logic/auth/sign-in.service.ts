import { Injectable, OnDestroy } from '@angular/core';
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
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { Result, SignInCredentials } from 'src/app/shared/models/exports';

@Injectable()
export class SignInService implements OnDestroy {
  public error$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<CognitoUserFacade>>;
  private _submit: Subject<SignInCredentials> = new Subject();
  public success$: Observable<CognitoUserFacade | undefined>;

  constructor(
    private _accountService: AccountService,
    private _logger: LoggingService,
    private _router: Router
  ) {
    this.result$ = this._submit.pipe(
      exhaustMap((data) => this._accountService.signIn(data)),
      shareReplay(1)
    );

    const [success$, error$] = partition(
      this.result$,
      (value) => !!value.result
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        switch (value?.attributes?.['custom:access_group']) {
          case 'petitioner':
            this._router.navigate(['/committee/home']);
            break;
          case 'admin':
            this._router.navigate(['/city-staff/home']);
            break;
          //You must add as many conditions as there are roles
        }
      }),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error),
      tap((value) => this._logger.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this._submit.pipe(
        map((_) => true),
        tap((_) => this._logger.log('start'))
      ),
      end$.pipe(
        map((_) => false),
        tap((_) => this._logger.log('end'))
      )
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this._submit.complete();
  }

  /**
   * This method begins a user's authentication process.
   * @param value SignInCredentials type object, contains email and password data provided by the user.
   */
  requestSignIn(value: SignInCredentials) {
    this._submit.next(value);
  }
}
