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
import { AccountService } from 'src/app/auth/account-service/account.service';
import { Result, SignInCredentials } from 'src/app/shared/models/exports';

@Injectable()
export class SignInService implements OnDestroy {
  public error$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private _submit: Subject<SignInCredentials> = new Subject();
  public success$: Observable<Result<string>>;

  constructor(private _accountService: AccountService) {
    this.result$ = this._submit.pipe(
      exhaustMap((data) => this._accountService.signIn(data)),
      shareReplay(1)
    );

    const [success$, error$] = partition(this.result$, (value) =>
      !!value.result
    );

    this.success$ = success$.pipe(
      //redirect
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      //map((value) => value.error),
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this._submit.pipe(
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
    this._submit.complete();
  }

  requestSignIn(value: SignInCredentials) {
    this._submit.next(value);
  }
}
