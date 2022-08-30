import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { Member } from 'src/app/shared/models/admin/member';
import { Result } from 'src/app/shared/models/exports';
import { AdminService } from './admin.service';

@Injectable()
export class GetAllUsersService {
  public error$: Observable<string | undefined>;
  public success$: Observable<Member[] | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<Member[]>>;
  private submit$: ReplaySubject<void> = new ReplaySubject();
  private cursor: string | undefined;

  constructor(
    private _adminService: AdminService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap(() => this._adminService.getAllUser(this.cursor)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        this._loggingService.log(value);
        //extract the cursor from the received object
        this.cursor = '';
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

  /** This method begins the process of obtaining a members
   */

  getMembers() {
    this.submit$.next();
  }
}
