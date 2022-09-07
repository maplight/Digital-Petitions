import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetitionStatus, PetitionType } from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SetSiteDesignService } from 'src/app/logic/admin/set-site-design.service';
import { GetSiteDesignService } from 'src/app/logic/admin/get-site-design.service';
import { TemeData } from 'src/app/shared/models/admin/teme-data';

@Component({
  selector: 'dp-city-staff-site-design',
  templateUrl: './city-staff-site-design.component.html',
})
export class CityStaffSiteDesignComponent implements OnInit, OnDestroy {
  protected mockPetition: ResponsePetition = {
    dataIssue: {
      __typename: 'IssuePetition',
      title: 'Petition Title',
      detail:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt fugiat blanditiis, corporis culpa porro voluptas est, natus, cupiditate iure possimus debitis? Magni explicabo nesciunt animi nostrum placeat. Consequatur, nesciunt modi?',
      createdAt: '00/00/0000',
      owner: '',
      PK: '',
      status: PetitionStatus.NEW,
      version: 0,
      type: PetitionType.ISSUE,
      updatedAt: '00/00/0000',
      signatures: { __typename: 'SignatureConnection', items: [] },
    },
  };

  protected headerColor!: string | null;
  protected buttonColor!: string | null;
  protected highlightColor!: string | null;
  protected logo!: string | null;

  protected error$!: Observable<string | undefined>;
  protected loading$!: Observable<boolean>;
  protected firstLoading$!: Observable<boolean>;
  protected success$!: Observable<TemeData | undefined>;

  private localError: Subject<string> = new Subject();

  constructor(
    private _setSiteDesignLogic: SetSiteDesignService,
    private _getSiteDesignLogic: GetSiteDesignService
  ) {
    this.error$ = merge(
      this._setSiteDesignLogic.error$,
      this._getSiteDesignLogic.error$,
      this.localError
    );
    this.loading$ = this._setSiteDesignLogic.loading$;
    this.firstLoading$ = this._getSiteDesignLogic.loading$;
    this.success$ = this._getSiteDesignLogic.success$;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this._getSiteDesignLogic.getSiteTemeData();
  }
  submit() {
    if (
      this.buttonColor &&
      this.headerColor &&
      this.highlightColor &&
      this.logo
    ) {
      this._setSiteDesignLogic.setSiteTemeData({
        buttonColor: this.buttonColor,
        headerColor: this.headerColor,
        highlightColor: this.highlightColor,
        logoImage: this.logo,
        expectedVersion: 1,
      });
      this.localError.next('');
    } else {
      this.localError.next('There are invalid or empty fields');
    }
  }
  setColor(data: string | null) {
    console.log(data);
  }
}
