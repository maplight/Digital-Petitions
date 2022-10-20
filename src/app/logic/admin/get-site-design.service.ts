import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  shareReplay,
  tap,
} from 'rxjs';
import { SiteConfiguration } from 'src/app/core/api/API';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { Result } from 'src/app/shared/models/exports';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class GetSiteDesignService {
  public error$: Observable<string | undefined>;
  public success$: Observable<SiteConfiguration | null | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<SiteConfiguration | null>>;
  private submit$: ReplaySubject<void> = new ReplaySubject();

  constructor(
    private _adminLogic: AdminService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((_) => this._adminLogic.getThemeData()),
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
        map(() => true),
        tap(() => this._loggingService.log('start'))
      ),
      end$.pipe(
        map(() => false),
        tap(() => this._loggingService.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }

  getSiteThemeData() {
    this.submit$.next();
  }
}
