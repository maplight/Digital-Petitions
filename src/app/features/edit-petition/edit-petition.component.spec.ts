import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { EditPetitionCandidateModule } from './edit-petition-candidate/edit-petition-candidate.module';
import { EditPetitionIssueModule } from './edit-petition-issue/edit-petition-issue.module';
import { EditPetitionRoutingModule } from './edit-petition-routing.module';
import { Observable, of } from 'rxjs';
import { EditPetitionComponent } from './edit-petition.component';
import { EditResultPetitionModule } from './edit-result-petition/edit-result-petition.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { GetCommitteePetitionService } from 'src/app/logic/petition/get-committee-petition.service';
import {
  IssuePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';

describe('EditPetitionComponent', () => {
  let component: EditPetitionComponent;

  let fixture: ComponentFixture<EditPetitionComponent>;

  let _getCommitteePetitionService: GetCommitteePetitionService;

  const activatedRoute = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditPetitionComponent],
      imports: [
        CommonModule,
        RouterModule,
        EditPetitionCandidateModule,
        EditPetitionIssueModule,
        EditPetitionRoutingModule,
        ReturnLinkModule,
        MatDialogModule,
        BasicModalModule,
        EditResultPetitionModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        LoadingBarModule,
        ErrorMsgModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    })
      .overrideComponent(EditPetitionComponent, {
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
  }));

  beforeEach(async () => {
    activatedRoute.setParamMap({ id: mockedIssue.PK });
    fixture = TestBed.createComponent(EditPetitionComponent);
    component = fixture.componentInstance;
    _getCommitteePetitionService = fixture.debugElement.injector.get(
      GetCommitteePetitionService
    );
  });

  it('should create', () => {
    expect(component).toBeDefined();
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

  it('should show the edit petition issue element if the petition is an issue', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpEditPetitionIssue =
      fixture.debugElement.nativeElement.querySelectorAll(
        'dp-edit-petition-issue'
      );

    expect(dpEditPetitionIssue.length).toBe(1);
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

  it('should call getPetition in the logic service with the corresponding id', () => {
    const getPetitionSpy = spyOn(_getCommitteePetitionService, 'getPetition');

    component.ngOnInit();

    expect(getPetitionSpy).toHaveBeenCalledOnceWith(mockedIssue.PK);
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
