import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { CompleteAdminSignUpService } from 'src/app/logic/auth/complete-admin-sign-up.service';
import { SignInService } from 'src/app/logic/auth/sign-in.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { AdminSignUpData } from 'src/app/shared/models/auth/admin-sign-up-data';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { SignInCredentials } from 'src/app/shared/models/exports';
import { SingInRoutingModule } from './sign-in-routing.module';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let _signInService: SignInService;
  let _completeAdminSignUpService: CompleteAdminSignUpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
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
      .overrideComponent(SignInComponent, {
        set: {
          providers: [
            {
              provide: SignInService,
              useClass: MockedSignInService,
            },
            {
              provide: CompleteAdminSignUpService,
              useClass: MockedCompleteAdminSignUpService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    _signInService = fixture.debugElement.injector.get(SignInService);
    _completeAdminSignUpService = fixture.debugElement.injector.get(
      CompleteAdminSignUpService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the funcion "requestSignIn" in the service when onSubmitSignUpData function is called in the component', () => {
    const functionSpy = spyOn(_completeAdminSignUpService, 'completeSignUp');
    fixture.detectChanges();
    component.onSubmitSignUpData({
      firstName: 'textExample',
      lastName: 'textExample',
      password: 'textExample',
    });
    expect(functionSpy).toHaveBeenCalledOnceWith({
      firstName: 'textExample',
      lastName: 'textExample',
      password: 'textExample',
    });
  });

  it('should call the funcion "requestSignIn" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(_signInService, 'requestSignIn');
    fixture.detectChanges();
    component.formGroup.setValue({
      email: 'example@test.com',
      password: 'examplePassword',
    });
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      email: 'example@test.com',
      password: 'examplePassword',
    });
  });

  it('should show the loading bar when the component is waiting a response from service', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar when the component is not waiting a response from service', () => {
    spyOnProperty(_signInService, 'loading$', 'get').and.returnValue(of(false));
    spyOnProperty(
      _completeAdminSignUpService,
      'loading$',
      'get'
    ).and.returnValue(of(false));
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred in Complete Admin SignUp Service and is not loading', () => {
    spyOnProperty(_completeAdminSignUpService, 'error$', 'get').and.returnValue(
      of('error')
    );
    spyOnProperty(_signInService, 'success$', 'get').and.returnValue(
      of({
        attributes: {
          sub: 'textExample',
          address: 'textExample',
          email_verified: true,
          given_name: 'textExample',
          'custom:access_group': 'admin',
          family_name: 'textExample',
          email: 'textExample',
        },
        challengeName: 'NEW_PASSWORD_REQUIRED',
        username: 'username',
      })
    );
    spyOnProperty(
      _completeAdminSignUpService,
      'loading$',
      'get'
    ).and.returnValue(of(false));
    spyOnProperty(_signInService, 'loading$', 'get').and.returnValue(of(false));

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should show the error element if an error ocurred in SignIn Service and is not loading', () => {
    spyOnProperty(_signInService, 'error$', 'get').and.returnValue(of('error'));

    spyOnProperty(
      _completeAdminSignUpService,
      'loading$',
      'get'
    ).and.returnValue(of(false));
    spyOnProperty(_signInService, 'loading$', 'get').and.returnValue(of(false));

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_signInService, 'error$', 'get').and.returnValue(of('error'));

    spyOnProperty(_signInService, 'loading$', 'get').and.returnValue(of(true));

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedSignInService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<CognitoUserFacade | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }
  requestSignIn(value: SignInCredentials) {}
}

class MockedCompleteAdminSignUpService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }
  completeSignUp(signUpData: AdminSignUpData) {}
}
