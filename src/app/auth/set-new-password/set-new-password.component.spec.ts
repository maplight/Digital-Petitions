import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SetNewPasswordService } from 'src/app/logic/auth/set-new-password.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { NewPasswordData } from 'src/app/shared/models/exports';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { SetNewPasswordRoutingModule } from './set-new-password-routing.module';

import { SetNewPasswordComponent } from './set-new-password.component';

describe('SetNewPasswordComponent', () => {
  let component: SetNewPasswordComponent;
  let fixture: ComponentFixture<SetNewPasswordComponent>;
  let _setNewPasswordService: SetNewPasswordService;

  const activatedRoute = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetNewPasswordComponent],
      imports: [
        CommonModule,
        SetNewPasswordRoutingModule,
        ReturnLinkModule,
        MatProgressBarModule,
        BasicCardModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        LoadingBarModule,
        ErrorMsgModule,
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
      .overrideComponent(SetNewPasswordComponent, {
        set: {
          providers: [
            {
              provide: SetNewPasswordService,
              useClass: MockedSetNewPasswordService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    activatedRoute.setParamMap({ email: 'example@email.com' });
    fixture = TestBed.createComponent(SetNewPasswordComponent);
    component = fixture.componentInstance;
    _setNewPasswordService = fixture.debugElement.injector.get(
      SetNewPasswordService
    );
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the funcion "SignUpConfirmationCode" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(_setNewPasswordService, 'newPasswordData');

    component.formGroup.setValue({
      code: 'exampleTest',
      newPassword: 'exampleTest',
      confirmPassword: 'exampleTest',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      code: 'exampleTest',
      username: 'example@email.com',
      newPassword: 'exampleTest',
    });
  });

  it('should show the loading bar when the component is waiting a response from service', () => {
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar when the component is not waiting a response from service', () => {
    spyOnProperty(_setNewPasswordService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_setNewPasswordService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_setNewPasswordService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_setNewPasswordService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_setNewPasswordService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
class MockedSetNewPasswordService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  newPasswordData(value: NewPasswordData) {}
}
