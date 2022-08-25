import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-committee-home',
  templateUrl: './committee-home.component.html',
})
export class CommitteeHomeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected resultData: ResponsePetition[] = [];
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  private _unsubscribeAll: Subject<void> = new Subject();

  private currentFilter: FilterData[] = [
    {
      property: '',
      value: '',
      page: 0,
    },
  ];

  constructor(
    private _committeeLogic: GetPetitionsCommitteeService,
    private _accountLogic: AccountService
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngAfterViewInit(): void {
    this._accountLogic.currentUser$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        if (value) {
          this._committeeLogic.getPetitions({
            id: value.attributes.sub,
            filter: this.currentFilter,
          });
        }
      });
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        if (!!result.result) {
          this.resultData = result.result;
          if (result.result.length === 0) {
            this.currentStep$.next('empty');
          } else {
            this.currentStep$.next('contents');
          }
        } else {
          this.error = result.error;
          this.currentStep$.next('error');
        }
      });
    this.loading$ = this._committeeLogic.loading$;
  }
}
