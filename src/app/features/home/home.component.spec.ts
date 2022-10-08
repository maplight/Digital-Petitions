import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  CandidatePetition,
  IssuePetition,
  PetitionsByOwnerInput,
  PetitionsByTypeInput,
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { GetAnonymousPetitionsActiveService } from 'src/app/logic/committee/getAnonymousPetitionsActiveService..service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let _getAnonymousPetitionsActiveService: GetAnonymousPetitionsActiveService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        CommonModule,
        HomeRoutingModule,
        PetitionCardModule,
        MatButtonModule,
        RouterModule,
        FilterByCategoryModule,
        MatProgressBarModule,
        MatIconModule,
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
      .overrideComponent(HomeComponent, {
        set: {
          providers: [
            {
              provide: GetAnonymousPetitionsActiveService,
              useClass: MockedGetAnonymousPetitionsActiveService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    _getAnonymousPetitionsActiveService = fixture.debugElement.injector.get(
      GetAnonymousPetitionsActiveService
    );
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
    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

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
    const getPetitionsSpy = spyOn(
      _getAnonymousPetitionsActiveService,
      'getPetitionsAnonymous'
    );

    component.pageNumber();

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith({
      status: PetitionStatusQuery.ACTIVE,
      type: undefined,
      cursor: undefined,
    });
  });

  it('should show the message " You still have no petitions " when there are no elements in a successful response', () => {
    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'success$',
      'get'
    ).and.returnValue(
      of({
        items: [],
        cursor: undefined,
      })
    );

    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement.querySelectorAll('h3');

    expect(element[0].textContent).toEqual('You still have no petitions');
  });

  it('should show 7 buttons when a successful response is received', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard.length).toBe(7);
  });

  it('should show a "see more" button when cursor value', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard[6].textContent).toEqual(' See More ');
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getAnonymousPetitionsActiveService,
      'loading$',
      'get'
    ).and.returnValue(of(true));

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedGetAnonymousPetitionsActiveService {
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

  getPetitionsAnonymous(data: PetitionsByTypeInput) {}
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
