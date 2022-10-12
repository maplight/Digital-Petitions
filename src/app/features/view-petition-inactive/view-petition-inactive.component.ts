import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { FilterData } from 'src/app/shared/models/exports';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-view-petition',
  templateUrl: './view-petition-inactive.component.html',
  providers: [GetPublicPetitionService],
})
export class ViewPetitionInactiveComponent implements OnInit, OnDestroy {
  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected success$!: Observable<ResponsePetition | undefined>;
  protected id?: string;
  private _unsubscribeAll: Subject<void> = new Subject();

  private currentFilter: FilterData[] = [
    {
      property: '',
      value: '',
      page: 0,
    },
  ];

  constructor(
    private _committeeLogic: GetPublicPetitionService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngOnInit(): void {
    this.success$ = this._committeeLogic.success$;
    this._activatedRoute.paramMap
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => params.get('id')!),
        tap((id) => (this.id = id))
      )
      .subscribe((id) => this._committeeLogic.getPetition(id));
    this.loading$ = this._committeeLogic.loading$;
    this.error$ = this._committeeLogic.error$;
  }
}
