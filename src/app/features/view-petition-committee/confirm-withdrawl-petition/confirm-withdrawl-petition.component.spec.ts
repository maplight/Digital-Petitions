import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition.component';

describe('ConfirmWithdrawlPetitionComponent', () => {
  let component: ConfirmWithdrawlPetitionComponent;
  let fixture: ComponentFixture<ConfirmWithdrawlPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmWithdrawlPetitionComponent],
      imports: [
        CommonModule,
        BasicAlertModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        LoadingBarModule,
        ErrorMsgModule,
      ],
      providers: [
        ConfirmWithdrawlPetitionComponent,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { data: { id: 1 } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmWithdrawlPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('evaluates that the "dp-basic-alert" component exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('dp-basic-alert');
    expect(element).toBeTruthy();
  });

  it('evaluates that there are three buttons', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(3);
  });

  it('check that the alert message exists', () => {
    const element = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(element[0].textContent).toEqual(
      'Once this has been withdrawn it can not be undone'
    );
  });

  it('check that the form exists', () => {
    const element = fixture.debugElement.nativeElement.querySelector('form');
    expect(element).toBeTruthy();
  });
});
