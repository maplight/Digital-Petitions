import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import {
  CandidatePetition,
  PetitionStatus,
  PetitionType,
} from 'src/app/core/api/API';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ApproveAlertModule } from '../approve-alert/approve-alert.module';

import { ApproveDialogComponent } from './approve-dialog.component';

describe('AproveDialogComponent', () => {
  let component: ApproveDialogComponent;
  let fixture: ComponentFixture<ApproveDialogComponent>;

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
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
const dialogMock = {
  close: () => {},
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
