import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { CommitteeHomeRoutingModule } from './committee-home-routing.module';
import { Observable, of } from 'rxjs';
import { CommitteeHomeComponent } from './committee-home.component';
import {
  CandidatePetition,
  IssuePetition,
  PetitionsByOwnerInput,
  PetitionStatus,
  PetitionStatusQuery,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BufferPetition } from 'src/app/shared/models/petition/buffer-petitions';

describe('CommitteeHomeComponent', () => {
  let component: CommitteeHomeComponent;
  let fixture: ComponentFixture<CommitteeHomeComponent>;
  let _getPetitionsCommitteeService: GetPetitionsCommitteeService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CommitteeHomeComponent],
      imports: [
        CommonModule,
        CommitteeHomeRoutingModule,
        MatButtonModule,
        RouterModule,
        PetitionCardModule,
        MatIconModule,
        MatProgressBarModule,
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
      .overrideComponent(CommitteeHomeComponent, {
        set: {
          providers: [
            {
              provide: GetPetitionsCommitteeService,
              useClass: MockedGetPetitionsCommitteeService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CommitteeHomeComponent);
    component = fixture.componentInstance;
    _getPetitionsCommitteeService = fixture.debugElement.injector.get(
      GetPetitionsCommitteeService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading bar when the petition is loading', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(
      _getPetitionsCommitteeService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show 6 petition card elements when a successful response is received', () => {
    //component.ngOnInit();

    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('dp-petition-card');

    expect(dpPetitionCard.length).toBe(6);
  });

  it('should call getPetitions function when a "see more" button is clicked', () => {
    //component.ngOnInit();
    const getPetitionsSpy = spyOn(
      _getPetitionsCommitteeService,
      'getPetitions'
    );

    component.pageNumber();

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith({
      status: PetitionStatusQuery.ANY,
      owner: '',
    });
  });

  it('should show the message " You still have no petitions " when there are no elements in a successful response', () => {
    spyOnProperty(
      _getPetitionsCommitteeService,
      'success$',
      'get'
    ).and.returnValue(
      of({
        items: [],
        cursor: undefined,
      })
    );

    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement.querySelectorAll('h3');

    expect(element[1].textContent).toEqual(' You still have no petitions ');
  });

  it('should show 8 buttons when a successful response is received', () => {
    //component.ngOnInit();

    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard.length).toBe(8);
  });

  it('should show a "see more" button when cursor value', () => {
    //component.ngOnInit();

    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard[6].textContent).toEqual(' See More ');
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(
      _getPetitionsCommitteeService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getPetitionsCommitteeService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(
      _getPetitionsCommitteeService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getPetitionsCommitteeService,
      'loading$',
      'get'
    ).and.returnValue(of(true));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedGetPetitionsCommitteeService {
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

  getPetitions(data: PetitionsByOwnerInput): void {}
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
