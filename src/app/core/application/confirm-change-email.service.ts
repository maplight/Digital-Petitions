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
import { AccountService } from 'src/app/auth/account-service/account.service';
import { ConfirmEmailChangeForm } from 'src/app/auth/confirm-email-change-modal/confirm-email-change-form.interface';
import { Result } from './Result';

@Injectable({
  providedIn: 'root',
})
export class ConfirmChangeEmailService {
  public error$: Observable<Result<string>>;
  public success$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<ConfirmEmailChangeForm> = new Subject();

  constructor(private AccountService: AccountService) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this.AccountService.confirmEmailChange(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      tap((value) => console.log(value)),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
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

  set formGroupValue(value: ConfirmEmailChangeForm) {
    this.submit$.next(value);
  }
}
