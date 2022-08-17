import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  exhaustMap,
  filter,
  map,
  merge,
  Observable,
  of,
  partition,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { Result, SignUpCredentials } from 'src/app/shared/models/exports';

@Injectable()
export class SignUpService implements OnDestroy {
  public error$: Observable<Result<string>>;
  public success$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<SignUpCredentials> = new Subject();

  constructor(private AccountService: AccountService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this.AccountService.signUp(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      //redirect
      //map((value) => value.result),
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
  @param value: SignUpCredials type object, contains the necessary registration data to register a new committee user
  */
  formGroupValue(value: SignUpCredentials) {
    this.submit$.next(value);
  }
}
