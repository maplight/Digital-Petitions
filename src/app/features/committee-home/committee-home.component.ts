import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { FilterData } from 'src/app/shared/models/exports';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';

@Component({
  selector: 'dp-committee-home',
  templateUrl: './committee-home.component.html',
})
export class CommitteeHomeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected loadingTitle: string = '';
  protected loadingSeeMore: boolean = false;
  protected cursor: string | undefined;
  protected disabledSeeMore: boolean = true;
  protected resultData!: BufferPetition;
  protected result$!: Subscription;
  protected error: string | undefined;
  protected loading$!: Observable<boolean>;
  protected currentStep$: BehaviorSubject<
    'loading' | 'empty' | 'contents' | 'error'
  > = new BehaviorSubject<'loading' | 'empty' | 'contents' | 'error'>(
    'loading'
  );
  private _unsubscribeAll: Subject<void> = new Subject();

  constructor(
    private _committeeLogic: GetPetitionsCommitteeService,
    private _accountLogic: AccountService
  ) {}
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  ngAfterViewInit(): void {
    this.getPetitions();
  }
  ngOnInit(): void {
    this.loadingTitle = 'Waiting for user data';
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
  private getPetitions() {
    this.disabledSeeMore = true;
    this._accountLogic.currentUser$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        if (value) {
          this._committeeLogic.getPetitions({
            id: value.attributes.sub,
            cursor: this.cursor,
          });
        }
      });
  }
  pageNumber() {
    this.loadingSeeMore = true;
    this.getPetitions();
  }
}
