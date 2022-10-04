import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  PetitionStatus,
  PetitionType,
  SiteConfiguration,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SetSiteDesignService } from 'src/app/logic/admin/set-site-design.service';
import { GetSiteDesignService } from 'src/app/logic/admin/get-site-design.service';
import { ThemingService } from 'src/app/core/dynamic-theme/theming.service';

@Component({
  selector: 'dp-city-staff-site-design',
  templateUrl: './city-staff-site-design.component.html',
  providers: [SetSiteDesignService],
})
export class CityStaffSiteDesignComponent implements OnInit {
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
  protected success$!: Observable<SiteConfiguration | null | undefined>;

  private localError: Subject<string> = new Subject();

  constructor(
    private _setSiteDesignLogic: SetSiteDesignService,
    private _themeLogic: ThemingService
  ) {
    this.error$ = merge(this._setSiteDesignLogic.error$, this.localError);
    this.loading$ = this._setSiteDesignLogic.loading$;
    this.firstLoading$ = this._themeLogic.loading$;
    this.success$ = this._themeLogic.theme$;
  }

  ngOnInit(): void {}
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
        expectedVersion: this._themeLogic.version || 0,
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
