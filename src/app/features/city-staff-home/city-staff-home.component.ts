import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-home',
  templateUrl: './city-staff-home.component.html',
})
export class CityStaffHomeComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject();
  protected username: string = '';
  protected resultData: ResponsePetition[] = [];
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error' | 'loadingUp'
  > = new BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error' | 'loadingUp'
  >('loading');
  protected disabledFilter: boolean = true;
  protected disabledSeeMore: boolean = true;
  private currentFilter: FilterData[] = [
    {
      property: 'Category',
      value: 'All',
      page: 0,
    },
    {
      property: 'Status',
      value: 'All',
      page: 0,
    },
    {
      property: 'Search',
      value: '',
      page: 0,
    },
  ];
  protected filterByCategory: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Ballot', value: 'issue', active: false },
    { name: 'Candidate', value: 'candidate', active: false },
  ];
  protected filterByStatus: {
    name: string;
    value: string;
    active: boolean;
  }[] = [
    { name: 'All types', value: 'all', active: true },
    { name: 'Pased', value: 'pased', active: false },
    { name: 'Failed', value: 'failed', active: false },
  ];
  constructor(
    private _getPetitionsActiveLogic: GetPetitionsActiveService,
    private _accountLogic: AccountService
  ) {}
  ngAfterViewInit(): void {
    this._getPetitionsActiveLogic.getPetitions(this.currentFilter);
  }
  ngOnInit(): void {
    this._accountLogic.currentUser$
      .pipe(
        tap((data) => {
          if (!!data) {
            this.username = data.attributes.given_name;
          }
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
    this.result$ = this._getPetitionsActiveLogic.result$.subscribe((result) => {
      this.disabledFilter = false;
      this.disabledSeeMore = false;
      if (!!result.result) {
        this.resultData = this.resultData.concat(result.result);
        this.currentStep$.next('contents');
      } else {
        this.error = result.error;
        this.currentStep$.next('error');
      }
    });
    this.loading$ = this._getPetitionsActiveLogic.loading$;
  }
  filterCategory(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[0].value = value;

    this.currentStep$.next('loadingUp');
    this._getPetitionsActiveLogic.getPetitions(this.currentFilter);
  }

  filterStatus(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[1].value = value;

    this.currentStep$.next('loadingUp');
    this._getPetitionsActiveLogic.getPetitions(this.currentFilter);
  }
  pageNumber() {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentStep$.next('loading');
    this.currentFilter[0].page += 1;
    this.currentFilter[1].page += 1;
    this.currentFilter[2].page += 1;
    this._getPetitionsActiveLogic.getPetitions(this.currentFilter);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  search(value: string) {
    if (value.length > 0) {
      this.disabledFilter = true;
      this.disabledSeeMore = true;
      this.currentFilter[2].value = value;
      this.currentStep$.next('loadingUp');
      this._getPetitionsActiveLogic.getPetitions(this.currentFilter);
    }
  }
}
