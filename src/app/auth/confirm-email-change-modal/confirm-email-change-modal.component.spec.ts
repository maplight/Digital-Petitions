import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable, of } from 'rxjs';
import { ConfirmChangeEmailService } from 'src/app/logic/auth/confirm-change-email.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ConfirmationCode } from 'src/app/shared/models/exports';

import { ConfirmEmailChangeModalComponent } from './confirm-email-change-modal.component';

describe('ConfirmEmailChangeModalComponent', () => {
  let component: ConfirmEmailChangeModalComponent;
  let fixture: ComponentFixture<ConfirmEmailChangeModalComponent>;
  let _confirmChangeEmailService: ConfirmChangeEmailService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmEmailChangeModalComponent],
      imports: [
        CommonModule,
        DialogResultModule,
        BasicModalModule,
        FormsModule,
        ReactiveFormsModule,
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
          useValue: dialogMock,
        },
      ],
    })
      .overrideComponent(ConfirmEmailChangeModalComponent, {
        set: {
          providers: [
            {
              provide: ConfirmChangeEmailService,
              useClass: MockedConfirmChangeEmailService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ConfirmEmailChangeModalComponent);
    component = fixture.componentInstance;
    _confirmChangeEmailService = fixture.debugElement.injector.get(
      ConfirmChangeEmailService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the result dialog and display a successful response if the "success" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');
    spyOnProperty(
      _confirmChangeEmailService,
      'success$',
      'get'
    ).and.returnValue(of('SUCCESS'));
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalledOnceWith(
      'Password Successfully Changed!',
      '',
      true
    );
  });

  it('should call the output dialog and display an error response if the "error" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');
    spyOnProperty(_confirmChangeEmailService, 'error$', 'get').and.returnValue(
      of('Some error')
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalledOnceWith(
      'An error has occurred',
      'Some error',
      false
    );
  });

  it('should call the funcion "setPersonalDetailsToUpdate" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(
      _confirmChangeEmailService,
      'setConfirmationCode'
    );

    component.formGroup.setValue({
      code: 'example',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      code: 'example',
    });
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
      _confirmChangeEmailService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
});

class MockedConfirmChangeEmailService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  setConfirmationCode(value: ConfirmationCode) {}
}
const dialogMock = {
  close: () => {},
};
