import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { GetPetitionsCandidateService } from 'src/app/logic/committee/getPetitionsCandidateService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
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

  constructor(private _committeeLogic: GetPetitionsActiveService) {}
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
  filter(value: string) {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentFilter[0].value = value;
    this.resultData = [];
    this.currentStep$.next('loading');
    this._committeeLogic.getPetitions(this.currentFilter);
  }
  pageNumber() {
    this.disabledFilter = true;
    this.disabledSeeMore = true;
    this.currentStep$.next('loading');
    this.currentFilter[0].page += 1;
    this._committeeLogic.getPetitions(this.currentFilter);
  }
}
