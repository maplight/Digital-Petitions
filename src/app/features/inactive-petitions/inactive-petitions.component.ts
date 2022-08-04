import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { GetPetitionsInactiveService } from 'src/app/logic/committee/getPetitionsInactiveService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-inactive-petitions',
  templateUrl: './inactive-petitions.component.html',
})
export class InactivePetitionsComponent implements OnInit, AfterViewInit {
  protected resultData: ResponsePetition[] = [];
  protected result$!: Subscription;
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
      value: 'All',
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
  constructor(private _committeeLogic: GetPetitionsInactiveService) {}
  ngAfterViewInit(): void {
    this._committeeLogic.getPetitions(this.currentFilter);
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$.subscribe((result) => {
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
    this.loading$ = this._committeeLogic.loading$;
  }
  filterCategory(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[0].value = value;
    this.resultData = [];
    this.currentStep$.next('loading');
    this._committeeLogic.getPetitions(this.currentFilter);
  }

  filterStatus(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[1].value = value;
    this.resultData = [];
    this.currentStep$.next('loading');
    this._committeeLogic.getPetitions(this.currentFilter);
  }
  pageNumber() {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentStep$.next('loading');
    this.currentFilter[0].page += 1;
    this.currentFilter[1].page += 1;
    this._committeeLogic.getPetitions(this.currentFilter);
  }
}
