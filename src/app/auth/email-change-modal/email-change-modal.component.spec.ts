import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { ChangeEmailService } from 'src/app/logic/auth/change-email.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ChangeEmailData } from 'src/app/shared/models/exports';
import { ConfirmEmailChangeModalModule } from '../confirm-email-change-modal/confirm-email-change-modal.module';

import { EmailChangeModalComponent } from './email-change-modal.component';

describe('EmailChangeModalComponent', () => {
  let component: EmailChangeModalComponent;
  let fixture: ComponentFixture<EmailChangeModalComponent>;
  let _changeEmailService: ChangeEmailService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailChangeModalComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmEmailChangeModalModule,
        DialogResultModule,
        BasicModalModule,
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
      .overrideComponent(EmailChangeModalComponent, {
        set: {
          providers: [
            {
              provide: ChangeEmailService,
              useClass: MockedChangeEmailService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(EmailChangeModalComponent);
    component = fixture.componentInstance;
    _changeEmailService = fixture.debugElement.injector.get(ChangeEmailService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the confirm email change dialog if the "success" element emits', () => {
    const functionSpy = spyOn(component, 'openSuccessDialog');
    spyOnProperty(_changeEmailService, 'success$', 'get').and.returnValue(
      of('SUCCESS')
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalledOnceWith();
  });

  it('should call the dialog and display an error if the "error" element emits', () => {
    const functionSpy = spyOn(component, 'openErrorDialog');
    spyOnProperty(_changeEmailService, 'error$', 'get').and.returnValue(
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
    const functionSpy = spyOn(_changeEmailService, 'setChangeEmailData');

    component.formGroup.setValue({
      email: 'test@email.com',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      email: 'test@email.com',
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
    spyOnProperty(_changeEmailService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
});

class MockedChangeEmailService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  setChangeEmailData(value: ChangeEmailData) {}
}
const dialogMock = {
  close: () => {},
};
