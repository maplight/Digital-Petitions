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
import { SetNewPasswordForm } from 'src/app/auth/set-new-password/set-new-password-form.interface';
import { ChangePasswordData, Result } from 'src/app/shared/models/exports';

@Injectable()
export class SetNewPasswordService implements OnDestroy {
  public error$: Observable<Result<string>>;
  public success$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<ChangePasswordData> = new Subject();

  constructor(private AccountService: AccountService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this.AccountService.setNewPassword(data)),
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

  set formGroupValue(value: ChangePasswordData) {
    this.submit$.next(value);
  }
}
