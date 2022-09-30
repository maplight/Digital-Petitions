import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SignUpService } from 'src/app/logic/auth/sign-up.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { SignUpCredentials } from 'src/app/shared/models/exports';
import { SignUpRoutingModule } from './sign-up-routing.module';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let _signUpService: SignUpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        CommonModule,
        SignUpRoutingModule,
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
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(SignUpComponent, {
        set: {
          providers: [
            {
              provide: SignUpService,
              useClass: MockedSignUpService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    _signUpService = fixture.debugElement.injector.get(SignUpService);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the funcion "SignUpCredentials" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(_signUpService, 'SignUpCredentials');

    component.formGroup.setValue({
      firstName: 'textExample',
      lastName: 'textExample',
      address: 'textExample',
      city: 'textExample',
      aptNumber: 'textExample',
      state: 'textExample',
      zipCode: 'textExample',
      email: 'textExample@test.com',
      password: 'textExample',
      cpassword: 'textExample',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      firstName: 'textExample',
      lastName: 'textExample',
      address: 'textExample',
      aptNumber: 'textExample',
      state: 'textExample',
      zipCode: 'textExample',
      email: 'textExample@test.com',
      password: 'textExample',
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
    spyOnProperty(_signUpService, 'loading$', 'get').and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_signUpService, 'error$', 'get').and.returnValue(of('error'));

    spyOnProperty(_signUpService, 'loading$', 'get').and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_signUpService, 'error$', 'get').and.returnValue(of('error'));

    spyOnProperty(_signUpService, 'loading$', 'get').and.returnValue(of(true));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedSignUpService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  SignUpCredentials(value: SignUpCredentials) {}
}
