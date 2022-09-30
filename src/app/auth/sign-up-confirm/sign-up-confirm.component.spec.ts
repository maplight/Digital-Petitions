import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { SignUpConfirmationCode } from 'src/app/shared/models/auth/sign-up-confirmation-code';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { SignUpConfirmRoutingModule } from './sign-up-confirm-routing.module';

import { SignUpConfirmComponent } from './sign-up-confirm.component';

describe('SignUpConfirmComponent', () => {
  let component: SignUpConfirmComponent;
  let fixture: ComponentFixture<SignUpConfirmComponent>;
  let _signUpConfirmService: SignUpConfirmService;
  const activatedRoute = new ActivatedRouteStub();

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
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    })
      .overrideComponent(SignUpConfirmComponent, {
        set: {
          providers: [
            {
              provide: SignUpConfirmService,
              useClass: MockedSignUpConfirmService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    activatedRoute.setParamMap({ email: 'example@email.com' });

    fixture = TestBed.createComponent(SignUpConfirmComponent);
    component = fixture.componentInstance;
    _signUpConfirmService =
      fixture.debugElement.injector.get(SignUpConfirmService);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the funcion "SignUpConfirmationCode" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(_signUpConfirmService, 'SignUpConfirmationCode');

    component.formGroup.setValue({
      code: '123345',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      code: '123345',
      username: 'example@email.com',
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
    spyOnProperty(_signUpConfirmService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_signUpConfirmService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_signUpConfirmService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_signUpConfirmService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_signUpConfirmService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
class MockedSignUpConfirmService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  SignUpConfirmationCode(value: SignUpConfirmationCode) {}
}
