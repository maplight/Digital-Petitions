import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CodeSubmissionResult } from 'src/app/core/api/API';
import { ConfirmSignPetitionService } from 'src/app/logic/petition/confirm-sign-petition.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ConfirmSignPetitionRoutingModule } from './confirm-sign-petition-routing.module';

import { ConfirmSignPetitionComponent } from './confirm-sign-petition.component';

describe('ConfirmSignPetitionComponent', () => {
  let component: ConfirmSignPetitionComponent;
  let fixture: ComponentFixture<ConfirmSignPetitionComponent>;

  let _getConfirmSignPetitionService: ConfirmSignPetitionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmSignPetitionComponent],
      imports: [
        CommonModule,
        BasicCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        ConfirmSignPetitionRoutingModule,
        ReturnLinkModule,
        LoadingBarModule,
        ErrorMsgModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ConfirmSignPetitionComponent, {
        set: {
          providers: [
            {
              provide: ConfirmSignPetitionService,
              useClass: MockedConfirmSignPetitionService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ConfirmSignPetitionComponent);
    component = fixture.componentInstance;
    _getConfirmSignPetitionService = fixture.debugElement.injector.get(
      ConfirmSignPetitionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must call the service when submitting with a valid form', () => {
    const callSpy = spyOn(
      _getConfirmSignPetitionService,
      'setConfirmationCode'
    );
    component.ngOnInit();
    component.formGroup.patchValue({ code: '123345' });

    fixture.detectChanges();

    component.submit();
    expect(callSpy).toHaveBeenCalledOnceWith('123345');
  });

  it('should show the loading bar when the petition is loading', () => {
    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(
      _getConfirmSignPetitionService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(
      _getConfirmSignPetitionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getConfirmSignPetitionService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(
      _getConfirmSignPetitionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _getConfirmSignPetitionService,
      'loading$',
      'get'
    ).and.returnValue(of(true));

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});

class MockedConfirmSignPetitionService {
  public get error$(): Observable<string | undefined> {
    return of(undefined);
  }

  public get success$(): Observable<CodeSubmissionResult | undefined> {
    return of({
      __typename: 'CodeSubmissionResult',
      id: '12345',
      title: 'Mock Petition',
      error: null,
    });
  }
  public get loading$(): Observable<boolean> {
    return of(true);
  }

  setConfirmationCode(data: string) {}
}
