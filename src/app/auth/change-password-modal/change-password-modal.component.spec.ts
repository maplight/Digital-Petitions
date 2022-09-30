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
import { ChangePasswordService } from 'src/app/logic/auth/change-password.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ChangePasswordData } from 'src/app/shared/models/exports';

import { ChangePasswordModalComponent } from './change-password-modal.component';

describe('ChangePasswordModalComponent', () => {
  let component: ChangePasswordModalComponent;
  let fixture: ComponentFixture<ChangePasswordModalComponent>;
  let _changePasswordService: ChangePasswordService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordModalComponent],
      imports: [
        CommonModule,
        BasicModalModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        DialogResultModule,
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
      .overrideComponent(ChangePasswordModalComponent, {
        set: {
          providers: [
            {
              provide: ChangePasswordService,
              useClass: MockedChangePasswordService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChangePasswordModalComponent);
    component = fixture.componentInstance;
    _changePasswordService = fixture.debugElement.injector.get(
      ChangePasswordService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the result dialog and display a successful response if the "success" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');
    spyOnProperty(_changePasswordService, 'success$', 'get').and.returnValue(
      of('SUCCESS')
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalledOnceWith(
      'Password Successfully Changed!',
      '',
      true
    );
  });

  it('should call the output dialog and display an error response if the "error" element emits', () => {
    const functionSpy = spyOn(component, 'openDialog');
    spyOnProperty(_changePasswordService, 'error$', 'get').and.returnValue(
      of('Some error')
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalledOnceWith(
      'An error has occurred',
      'Some error',
      false
    );
  });

  it('should call the funcion "setPasswordData" in the service when submit function is called in the component and the form is valid', () => {

    const functionSpy = spyOn(_changePasswordService, 'setPasswordData');


    component.formGroup.setValue({
      oldPassword: 'testOldPass',
      newPassword: 'testNewPass',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      oldPassword: 'testOldPass',
      newPassword: 'testNewPass',
    });
  });

  it('should show the loading bar when the petition is loading', () => {

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_changePasswordService, 'loading$', 'get').and.returnValue(
      of(false)
    );


    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });
});

class MockedChangePasswordService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }


  setPasswordData(value: ChangePasswordData) {}
}


const dialogMock = {
  close: () => {},
};
