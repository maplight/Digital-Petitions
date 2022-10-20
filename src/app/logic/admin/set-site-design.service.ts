import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { AdminService } from './admin.service';
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
import {
  SiteConfiguration,
  SiteConfigurationInput,
} from 'src/app/core/api/API';
import { Result } from 'src/app/shared/models/exports';

@Injectable()
export class SetSiteDesignService {
  public error$: Observable<string | undefined>;
  public success$: Observable<SiteConfiguration | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<SiteConfiguration>>;
  private submit$: Subject<SiteConfigurationInput> = new Subject();

  constructor(
    private _adminLogic: AdminService,
    private _loggingService: LoggingService
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this._adminLogic.setThemeData(data)),
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

  setSiteTemeData(value: SiteConfigurationInput) {
    this.submit$.next(value);
  }
}
