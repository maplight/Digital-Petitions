import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import {
  CandidatePetition,
  IssuePetition,
  PetitionsByTypeInput,
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { CityStaffHomeService } from 'src/app/logic/admin/city-staff-home.service';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { CityStaffHomeRoutingModule } from './city-staff-home-routing.module';

import { CityStaffHomeComponent } from './city-staff-home.component';

describe('CityStaffHomeComponent', () => {
  let component: CityStaffHomeComponent;
  let fixture: ComponentFixture<CityStaffHomeComponent>;
  let _cityStaffHomeService: CityStaffHomeService;
  let _getAccountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffHomeComponent],
      imports: [
        CommonModule,
        CityStaffHomeRoutingModule,
        BasicSearchEngineModule,
        FilterByCategoryModule,
        FilterByStatusModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        PetitionCardModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(CityStaffHomeComponent, {
        set: {
          providers: [
            {
              provide: AccountService,
              useClass: MockedAccountService,
            },
            {
              provide: CityStaffHomeService,
              useClass: MockedCityStaffHomeService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(CityStaffHomeComponent);
    component = fixture.componentInstance;
    _cityStaffHomeService =
      fixture.debugElement.injector.get(CityStaffHomeService);
    _getAccountService = fixture.debugElement.injector.get(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading bar when the petition is loading', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_cityStaffHomeService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show 6 petition card elements when a successful response is received', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('dp-petition-card');

    expect(dpPetitionCard.length).toBe(6);
  });

  it('should call getPetitionsAnonymous function when a "see more" button is clicked', () => {
    const getPetitionsSpy = spyOn(_cityStaffHomeService, 'getPetitions');

    component.pageNumber();

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith(
      {
        status: PetitionStatusQuery.ANY,
        type: undefined,
      },
      false
    );
  });

  it('should call getPetitionsAnonymous function when a filter by status is selected', () => {
    const getPetitionsSpy = spyOn(_cityStaffHomeService, 'getPetitions');

    component.filterStatus(PetitionStatusQuery.ACTIVE);

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith(
      {
        status: PetitionStatusQuery.ACTIVE,
        type: undefined,
      },
      true
    );
  });

  it('should call getPetitionsAnonymous function when a filter by type is selected', () => {
    const getPetitionsSpy = spyOn(_cityStaffHomeService, 'getPetitions');

    component.filterCategory(PetitionType.CANDIDATE);

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith(
      {
        status: PetitionStatusQuery.ANY,
        type: PetitionType.CANDIDATE,
      },
      true
    );
  });

  it('should show the message " You still have no petitions " when there are no elements in a successful response', () => {
    spyOnProperty(_cityStaffHomeService, 'success$', 'get').and.returnValue(
      of({
        items: [],
        cursor: undefined,
      })
    );

    spyOnProperty(_cityStaffHomeService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement.querySelectorAll('h3');

    expect(element[0].textContent).toEqual('You still have no petitions');
  });

  it('should show 8 buttons when a successful response is received', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard.length).toBe(8);
  });

  it('should show a "see more" button when cursor value', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard[7].textContent).toEqual(' See More ');
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_cityStaffHomeService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_cityStaffHomeService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_cityStaffHomeService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_cityStaffHomeService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedCityStaffHomeService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<BufferPetition | undefined> {
    return of({
      items: [
        { dataIssue: mockedIssue },
        { dataCandidate: mockedCandiadate },
        { dataIssue: mockedIssue },
        { dataCandidate: mockedCandiadate },
        { dataIssue: mockedIssue },
        { dataCandidate: mockedCandiadate },
      ],
      cursor: '1',
    });
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  getPetitions(data: PetitionsByTypeInput, reset: boolean = false) {}
}

const mockedIssue: IssuePetition = {
  __typename: 'IssuePetition',
  PK: '1',
  createdAt: '',
  detail: 'Text',
  owner: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.NEW,
  title: 'Title',
  type: PetitionType.ISSUE,
  updatedAt: '',
  version: 0,
};

const mockedCandiadate: CandidatePetition = {
  __typename: 'CandidatePetition',
  PK: '',
  address: {
    __typename: 'AddressData',
    address: '',
    city: undefined,
    number: undefined,
    state: '',
    zipCode: undefined,
  },
  createdAt: '',
  name: '',
  office: '',
  owner: '',
  party: '',
  signatures: {
    __typename: 'SignatureConnection',
    items: [],
    token: undefined,
  },
  status: PetitionStatus.ACTIVE,
  type: PetitionType.CANDIDATE,
  updatedAt: '',
  version: 0,
};
class MockedAccountService {
  public get currentUser(): CognitoUserFacade | undefined {
    return {
      attributes: {
        sub: 'textExample',
        address: 'textExample',
        email_verified: true,
        given_name: 'first name',
        'custom:access_group': 'admin',
        family_name: 'last name',
        email: 'email@test.com',
      },
      challengeName: 'NEW_PASSWORD_REQUIRED',
      username: 'username',
    };
  }
}
