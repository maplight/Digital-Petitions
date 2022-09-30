import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ForgotPasswordService } from 'src/app/logic/auth/forgot-password.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { RecoverPasswordData } from 'src/app/shared/models/exports';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let _forgotPasswordService: ForgotPasswordService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        BasicCardModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        ReturnLinkModule,
        LoadingBarModule,
        ErrorMsgModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ForgotPasswordComponent, {
        set: {
          providers: [
            {
              provide: ForgotPasswordService,
              useClass: MockedForgotPasswordService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    _forgotPasswordService = fixture.debugElement.injector.get(
      ForgotPasswordService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the funcion "RecoverPasswordData" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(_forgotPasswordService, 'RecoverPasswordData');

    component.formGroup.setValue({
      email: 'example@test.com',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      email: 'example@test.com',
    });
  });

  it('should show the loading bar when the component is waiting a response from service', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar when the component is not waiting a response from service', () => {
    spyOnProperty(_forgotPasswordService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_forgotPasswordService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_forgotPasswordService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_forgotPasswordService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_forgotPasswordService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedForgotPasswordService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  RecoverPasswordData(value: RecoverPasswordData) {}
}
