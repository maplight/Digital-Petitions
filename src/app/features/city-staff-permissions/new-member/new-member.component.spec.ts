import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { Observable, of } from 'rxjs';
import { NewMemberComponent } from './new-member.component';
import {
  AccessLevel,
  StaffAccessLevel,
  StaffUserInput,
  User,
} from 'src/app/core/api/API';
import { NewMemberService } from 'src/app/logic/admin/new-member.service';

describe('NewMemberComponent', () => {
  let component: NewMemberComponent;
  let fixture: ComponentFixture<NewMemberComponent>;
  let _newMemberService: NewMemberService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMemberComponent],
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
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
      ],
    })
      .overrideComponent(NewMemberComponent, {
        set: {
          providers: [
            {
              provide: NewMemberService,
              useClass: MockedNewMemberService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(NewMemberComponent);
    component = fixture.componentInstance;
    _newMemberService = fixture.debugElement.injector.get(NewMemberService);
  });

  it('should close the dialog if the "success" element emits', () => {
    const functionSpy = spyOn(dialogMock, 'close');
    spyOnProperty(_newMemberService, 'success$', 'get').and.returnValue(
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
    const functionSpy = spyOn(_newMemberService, 'newStaffUser');

    component.formGroup.setValue({
      email: 'example@email.com',
      permissions: StaffAccessLevel.ADMIN,
    });
    fixture.detectChanges();
    component.submit();
    expect(functionSpy).toHaveBeenCalledOnceWith({
      email: 'example@email.com',
      permissions: StaffAccessLevel.ADMIN,
    });
  });

  it('should show a error in the form when submit function is called in the component and the form is invalid', () => {
    component.formGroup.setValue({
      email: '',
      permissions: '',
    });

    component.submit();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-error').length
    ).toEqual(2);
  });

  it('should show the loading bar when the data is loading', () => {
    spyOnProperty(_newMemberService, 'loading$', 'get').and.returnValue(
      of(true)
    );
    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the data is not loading', () => {
    spyOnProperty(_newMemberService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_newMemberService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_newMemberService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_newMemberService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_newMemberService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
const dialogMock = {
  close: () => {},
};
class MockedNewMemberService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<User | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return of(true);
  }

  newStaffUser(value: StaffUserInput) {}
}
