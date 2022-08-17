import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-view-petition',
  templateUrl: './view-petition-inactive.component.html',
})
export class ViewPetitionInactiveComponent implements OnInit, AfterViewInit {
  protected resultData: ResponsePetition = {};
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  private currentFilter: FilterData[] = [
    {
      property: '',
      value: '',
      page: 0,
    },
  ];

  constructor(
    private _committeeLogic: GetPetitionService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this._committeeLogic.getPetition(
      this._activatedRoute.snapshot.params['id']
    );
  }
  ngOnInit(): void {
    this.result$ = this._committeeLogic.result$.subscribe((result) => {
      if (!!result.result) {
        this.resultData = result.result;

        this.currentStep$.next('contents');
      } else {
        this.error = result.error;
        this.currentStep$.next('error');
      }
    });
    this.loading$ = this._committeeLogic.loading$;
  }
}
