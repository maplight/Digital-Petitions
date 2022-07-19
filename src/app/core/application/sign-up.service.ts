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
import { AccountService } from 'src/app/auth/account-service/account.service';
import { Result } from './Result';

@Injectable({
  providedIn: 'root',
})
export class SignUpService implements OnDestroy {
  public error$: Observable<Result<string>>;
  public success$: Observable<Result<string>>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private submit$: Subject<FormGroup> = new Subject();

  constructor(private AccountService: AccountService) {
    const start$ = this.submit$.pipe(
      filter((formGroup) => formGroup.valid),
      shareReplay(1)
    );
    this.result$ = start$.pipe(
      exhaustMap((data) => this.AccountService.signUp(data.value)),
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
      start$.pipe(
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

  set formGroupValue(formGroup: FormGroup) {
    this.submit$.next(formGroup);
  }
}
