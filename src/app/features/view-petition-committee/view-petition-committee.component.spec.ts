import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { AlertWithdrawlPetitionModule } from './alert-withdrawl-petition/alert-withdrawl-petition.module';
import { ConfirmWithdrawlPetitionModule } from './confirm-withdrawl-petition/confirm-withdrawl-petition.module';
import { CurrentResultModule } from './current-result/current-result.module';
import { ViewPetitionCommitteeRoutingModule } from './view-petition-committee-routing.module';
import { Observable, of } from 'rxjs';

import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';
import { WithdrawlResultModule } from './withdrawl-result/withdrawl-result.module';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

describe('ViewPetitionCommitteeComponent', () => {
  let component: ViewPetitionCommitteeComponent;
  let fixture: ComponentFixture<ViewPetitionCommitteeComponent>;
  let _getCommitteePetitionService: GetCommitteePetitionService;
  const activatedRoute = new ActivatedRouteStub();
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ViewPetitionCommitteeComponent],
      imports: [
        CommonModule,
        ViewPetitionCommitteeRoutingModule,
        MatProgressBarModule,
        MatIconModule,
        PetitionViewModule,
        ReturnLinkModule,
        CurrentResultModule,
        MatButtonModule,
        AlertWithdrawlPetitionModule,
        ConfirmWithdrawlPetitionModule,
        MatDialogModule,
        RouterTestingModule,
        WithdrawlResultModule,
        PetitionStatusModule,
        LoadingBarModule,
        ErrorMsgModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    })
      .overrideComponent(ViewPetitionCommitteeComponent, {
        set: {
          providers: [
            {
              provide: GetCommitteePetitionService,
              useClass: MockedGetCommitteePetitionService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    activatedRoute.setParamMap({ id: mockedIssue.PK });
    fixture = TestBed.createComponent(ViewPetitionCommitteeComponent);
    component = fixture.componentInstance;
    _getCommitteePetitionService = fixture.debugElement.injector.get(
      GetCommitteePetitionService
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
      _getCommitteePetitionService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the petition view element when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-petition-view');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show the "current result" element when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('dp-current-result');

    expect(dpEditPetitionIssue.length).toBe(1);
  });

  it('should show two buttons when a successful response is received', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpEditPetitionIssue.length).toBe(2);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(
      _getCommitteePetitionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getCommitteePetitionService,
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
      _getCommitteePetitionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getCommitteePetitionService,
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

class MockedGetCommitteePetitionService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<ResponsePetition | undefined> {
    return of({ dataIssue: mockedIssue });
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  getPetition(id: string): void {}
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
