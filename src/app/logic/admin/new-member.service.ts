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
import { StaffUserInput, User } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { NewMemberData } from 'src/app/shared/models/admin/new-member-data';
import { Result } from 'src/app/shared/models/exports';
import { AdminService } from './admin.service';

@Injectable()
export class NewMemberService {
  public error$: Observable<string | undefined>;
  public success$: Observable<User | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<User>>;
  private submit$: Subject<StaffUserInput> = new Subject();

  constructor(
    private _adminLogic: AdminService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._adminLogic.newMember(data)),
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
        tap(() => this._loggingService.log('start'))
      ),
      end$.pipe(
        map((v) => false),
        tap(() => this._loggingService.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }
  /** This method begins the process of password change for the user of the committee currently authenticated
  @param value: New user data
  */
  newStaffUser(value: StaffUserInput) {
    this.submit$.next(value);
  }
}
