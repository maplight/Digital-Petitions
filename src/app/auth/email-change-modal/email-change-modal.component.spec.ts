import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ConfirmEmailChangeModalModule } from '../confirm-email-change-modal/confirm-email-change-modal.module';

import { EmailChangeModalComponent } from './email-change-modal.component';

describe('EmailChangeModalComponent', () => {
  let component: EmailChangeModalComponent;
  let fixture: ComponentFixture<EmailChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailChangeModalComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmEmailChangeModalModule,
        DialogResultModule,
        BasicModalModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        LoadingBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
