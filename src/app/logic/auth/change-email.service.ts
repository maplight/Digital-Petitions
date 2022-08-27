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
import { LogginService } from 'src/app/core/loggin/loggin.service';
import { ChangeEmailData, Result } from 'src/app/shared/models/exports';

@Injectable()
export class ChangeEmailService implements OnDestroy {
  public error$: Observable<string | undefined>;
  public success$: Observable<string | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<ChangeEmailData> = new Subject();

  constructor(
    private AccountService: AccountService,
    private _logginService: LogginService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this.AccountService.changeEmail(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error),
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

  /** This method begins the process of email change for the user of the committee currently authenticated
  @param value: New user email
  */
  formGroupValue(value: ChangeEmailData) {
    this.submit$.next(value);
  }
}
