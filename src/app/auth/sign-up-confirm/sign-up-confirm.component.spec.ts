import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { SignUpConfirmRoutingModule } from './sign-up-confirm-routing.module';

import { SignUpConfirmComponent } from './sign-up-confirm.component';

describe('SignUpConfirmComponent', () => {
  let component: SignUpConfirmComponent;
  let fixture: ComponentFixture<SignUpConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpConfirmComponent],
      imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BasicCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        SignUpConfirmRoutingModule,
        ErrorMsgModule,
        LoadingBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
