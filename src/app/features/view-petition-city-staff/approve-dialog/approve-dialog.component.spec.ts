import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { Observable, of } from 'rxjs';
import {
  ApprovePetitionInput,
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { ApprovePetitionService } from 'src/app/logic/petition/approve-petition.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ResponsePetition } from 'src/app/shared/models/petition/response-petition';
import { ApproveAlertModule } from '../approve-alert/approve-alert.module';

import { ApproveDialogComponent } from './approve-dialog.component';

describe('AproveDialogComponent', () => {
  let component: ApproveDialogComponent;
  let fixture: ComponentFixture<ApproveDialogComponent>;
  let _approvePetitionService: ApprovePetitionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveDialogComponent],
      imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BasicModalModule,
        MatDialogModule,
        ApproveAlertModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DialogResultModule,
        MatProgressBarModule,
        LoadingBarModule,
        ErrorMsgModule,
        NgxMaskModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockedCandiadate,
        },
      ],
    })
      .overrideComponent(ApproveDialogComponent, {
        set: {
          providers: [
            {
              provide: ApprovePetitionService,
              useClass: MockedApprovePetitionService,
            },
            {
              provide: MatDialog,
              useValue: dialogMock,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(ApproveDialogComponent);
    component = fixture.componentInstance;
    _approvePetitionService = fixture.debugElement.injector.get(
      ApprovePetitionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the open function in MatDialog when AprovePetitionService emit a successful response', () => {
    const functionSpy = spyOn(dialogMock, 'open');
    spyOnProperty(_approvePetitionService, 'success$', 'get').and.returnValue(
      of({ dataCandidate: mockedCandiadate })
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalled();
  });

  it('should call the open function in MatDialog when Continue button is clicked and form is valid', () => {
    fixture.detectChanges();
    const functionSpy = spyOn(dialogMock, 'open');
    component.formGroup.setValue({
      deadline: new Date('10/10/2032'),
      requiredSignatures: '10',
    });

    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('dp-basic-modal'))
      .triggerEventHandler('sendEvent');
    expect(functionSpy).toHaveBeenCalled();
  });

  it('should show the loading bar when the petition is loading', () => {
    spyOnProperty(_approvePetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_approvePetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_approvePetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_approvePetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_approvePetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_approvePetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
const dialogMock = {
  close: () => {},
  open: () => {},
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
class MockedApprovePetitionService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<ResponsePetition | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  approvePetition(data: ApprovePetitionInput) {}
}
