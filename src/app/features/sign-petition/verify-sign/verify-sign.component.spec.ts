import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import {
  SignatureVerification,
  SignatureVerificationInput,
  VerificationMethod,
} from 'src/app/core/api/API';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { AnonimousGuard } from 'src/app/guards/anonimous.guard';
import { SignPetitionService } from 'src/app/logic/petition/sign-petition.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';

import { VerifySignComponent } from './verify-sign.component';

describe('VerifySignComponent', () => {
  let component: VerifySignComponent;
  let fixture: ComponentFixture<VerifySignComponent>;
  let _signPetitionService: SignPetitionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifySignComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        MatRadioModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReturnLinkModule,
        MatProgressBarModule,
        LoadingBarModule,
        ErrorMsgModule,
        RouterTestingModule.withRoutes([
          {
            path: 'petition/result-confirm-code/:title',
            component: VerifySignComponent,
          },
          {
            path: 'petition/confirm-code',
            component: VerifySignComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(VerifySignComponent, {
        set: {
          providers: [
            {
              provide: SignPetitionService,
              useClass: MockedSignPetitionService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(VerifySignComponent);
    component = fixture.componentInstance;
    _signPetitionService =
      fixture.debugElement.injector.get(SignPetitionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancelEvent when cancel metod is called', () => {
    component.cancelEvent.asObservable().subscribe((data) => {
      expect(data).toEqual('verify');
    });

    component.cancel('verify');
  });

  it('must call the service when submitting with a valid form', () => {
    const callSpy = spyOn(_signPetitionService, 'signPetition');
    component.ngOnInit();
    component.id = 'petitionId';
    component.title = 'petition title';
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL'],
    };
    component.formGroup.setValue({ verifyType: 'Email' });
    fixture.detectChanges();
    component.submit();
    expect(callSpy).toHaveBeenCalledOnceWith({
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      method: VerificationMethod.EMAIL,
      id: 'petitionId',
      methodPayload: [],
      title: 'petition title',
    });
  });

  it('the showMetod function must return true when receiving as a parameter a value contained among the verification methods valid for the signer', () => {
    const callSpy = spyOn(_signPetitionService, 'signPetition');
    component.ngOnInit();
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL'],
    };
    expect(component.showMethod('EMAIL')).toBeTrue();
  });

  it('must show the appropriate elements for the valid verification methods of the signer', () => {
    const callSpy = spyOn(_signPetitionService, 'signPetition');
    component.ngOnInit();
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL', 'TEXT', 'CALL', 'POSTAL'],
    };
    fixture.detectChanges();
    let elements =
      fixture.debugElement.nativeElement.querySelectorAll('dp-basic-card');
    expect(elements.length).toEqual(4);
  });

  it('should show the loading bar when the petition is loading', () => {
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL', 'TEXT', 'CALL', 'POSTAL'],
    };
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_signPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL', 'TEXT', 'CALL', 'POSTAL'],
    };
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_signPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_signPetitionService, 'loading$', 'get').and.returnValue(
      of(false)
    );
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL', 'TEXT', 'CALL', 'POSTAL'],
    };
    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_signPetitionService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_signPetitionService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    component.dataSignature = {
      __typename: 'VoterRecordMatch',
      address: 'address',
      city: 'city',
      fullName: 'fullName',
      state: 'CO',
      zipCode: '000000',
      token: 'token',
      methods: ['EMAIL', 'TEXT', 'CALL', 'POSTAL'],
    };
    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedSignPetitionService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<SignatureVerification | undefined> {
    return of({
      __typename: 'SignatureVerification',
      address: '',
      city: '',
      confirmationRequired: true,
      fullName: '',
      method: VerificationMethod.EMAIL,
      methodPayload: [],
      state: '',
      token: '',
      zipCode: '',
      title: 'Example',
    });
  }
  public get loading$(): Observable<boolean> {
    return of(true);
  }

  signPetition(data: SignatureVerificationInput) {}
}
