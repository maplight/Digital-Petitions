import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AccessLevel, UpdateUserAccessInput, User } from 'src/app/core/api/API';
import { ChangeAccountPermissionService } from 'src/app/logic/admin/change-account-permission.service';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

import { ChangeAccountPermissionComponent } from './change-account-permission.component';

describe('ChangeAccountPermissionComponent', () => {
  let component: ChangeAccountPermissionComponent;
  let fixture: ComponentFixture<ChangeAccountPermissionComponent>;
  let _changeAccountPermissionService: ChangeAccountPermissionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeAccountPermissionComponent],
      imports: [
        CommonModule,
        BasicModalModule,
        LoadingBarModule,
        ErrorMsgModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        DialogResultModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
    })
      .overrideComponent(ChangeAccountPermissionComponent, {
        set: {
          providers: [
            {
              provide: ChangeAccountPermissionService,
              useClass: MockedChangeAccountPermissionService,
            },
            {
              provide: MatDialogRef,
              useValue: dialogMock,
            },
            {
              provide: MAT_DIALOG_DATA,
              useValue: { id: 'id', access: AccessLevel.ADMIN },
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(ChangeAccountPermissionComponent);
    component = fixture.componentInstance;
    _changeAccountPermissionService = fixture.debugElement.injector.get(
      ChangeAccountPermissionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog if the "success" element emits', () => {
    const functionSpy = spyOn(dialogMock, 'close');
    spyOnProperty(
      _changeAccountPermissionService,
      'success$',
      'get'
    ).and.returnValue(
      of({
        __typename: 'User',
        email: 'example@test.com',
        firstName: 'exampleText',
        lastName: 'exampleTest',
        permissions: AccessLevel.ADMIN,
        username: 'exampleText',
      })
    );
    fixture.detectChanges();
    expect(functionSpy).toHaveBeenCalled();
  });

  it('should call the funcion "updateUserAccessInput" in the service when submit function is called in the component and the form is valid', () => {
    const functionSpy = spyOn(
      _changeAccountPermissionService,
      'updateUserAccessInput'
    );

    component.formGroup.setValue({
      type: 'GUEST',
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      permissions: AccessLevel.GUEST,
      username: 'id',
    });
  });

  it('should show a error in the form when submit function is called in the component and the form is invalid', () => {
    component.formGroup.setValue({
      type: '',
    });

    component.submit();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-error').length
    ).toEqual(1);
  });

  it('should show the loading bar when the data is loading', () => {
    spyOnProperty(
      _changeAccountPermissionService,
      'loading$',
      'get'
    ).and.returnValue(of(true));
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the data is not loading', () => {
    spyOnProperty(
      _changeAccountPermissionService,
      'loading$',
      'get'
    ).and.returnValue(of(false));

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(
      _changeAccountPermissionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _changeAccountPermissionService,
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
      _changeAccountPermissionService,
      'error$',
      'get'
    ).and.returnValue(of('error'));

    spyOnProperty(
      _changeAccountPermissionService,
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
const dialogMock = {
  close: () => {},
};
class MockedChangeAccountPermissionService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<User | undefined> {
    return new Observable();
  }
  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  updateUserAccessInput(value: UpdateUserAccessInput) {}
}
