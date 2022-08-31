import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { PetitionListStatusCheck } from 'src/app/core/api/API';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { GetPetitionsInactiveService } from 'src/app/logic/committee/getPetitionsInactiveService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-inactive-petitions',
  templateUrl: './inactive-petitions.component.html',
})
export class InactivePetitionsComponent implements OnInit, AfterViewInit {
  private _unsubscribeAll: Subject<void> = new Subject();

  protected resultData!: BufferPetition;
  protected result$!: Subscription;
  protected cursor: string | undefined;
  protected loadingTitle: string = '';
  protected loadingSeeMore: boolean = false;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
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
      value: PetitionListStatusCheck.INACTIVE,
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
    value: PetitionListStatusCheck;
    active: boolean;
  }[] = [
    {
      name: 'All types',
      value: PetitionListStatusCheck.INACTIVE,
      active: true,
    },
    { name: 'Pased', value: PetitionListStatusCheck.QUALIFIED, active: false },
    {
      name: 'Failed',
      value: PetitionListStatusCheck.NOT_QUALIFIED,
      active: false,
    },
  ];
  constructor(private _committeeLogic: GetPetitionsInactiveService) {}
  ngAfterViewInit(): void {
    this._committeeLogic.getPetitions({
      status: this.currentFilter[1].value,
      cursor: this.cursor,
    });
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => (this.loadingTitle = 'Waiting for your petitions'))
      )
      .subscribe((result) => {
        this.loadingSeeMore = false;
        if (!!result.result) {
          this.disabledSeeMore = false;
          if (this.resultData) {
            this.resultData.items = this.resultData.items.concat(
              result.result.items
            );
            this.cursor = result.result.cursor;
            console.log(this.cursor);
          } else {
            this.resultData = result.result;
            this.cursor = result.result.cursor;
          }

          if (result.result.items.length === 0) {
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
  filterCategory(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[0].value = value;

    this.currentStep$.next('loading');
    this._committeeLogic.getPetitions({
      status: this.currentFilter[1].value,
      cursor: this.cursor,
    });
  }

  filterStatus(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[1].value = value;
    this.currentStep$.next('loading');
    this.getPetitions();
  }
  private getPetitions() {
    this.disabledSeeMore = true;

    this._committeeLogic.getPetitions({
      status: this.currentFilter[1].value,
      cursor: this.cursor,
    });
  }
  pageNumber() {
    this.loadingSeeMore = true;
    this.getPetitions();
  }
}
