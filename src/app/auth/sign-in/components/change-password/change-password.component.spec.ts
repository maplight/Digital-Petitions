import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { SingInRoutingModule } from '../../sign-in-routing.module';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        CommonModule,
        SingInRoutingModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        BasicCardModule,
        MatProgressBarModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('the submitSignUpData object should emit a correct value when the submit function is called and the form is valid', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture.detectChanges();
    component.formGroup.setValue({
      password: 'exampleText',
      firstName: 'exampleText',
      lastName: 'exampleText',
    });
    component.submitSignUpData.asObservable().subscribe((data) => {
      expect(data).toEqual({
        password: 'exampleText',
        firstName: 'exampleText',
        lastName: 'exampleText',
      });
    });
    component.submit();
  });
});
