import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  _MatDialogContainerBase,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AccessLevel, UserConnection } from 'src/app/core/api/API';
import { GetAllUsersService } from 'src/app/logic/admin/get-all-users.service';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ChangeAccountPermissionComponent } from './change-account-permission/change-account-permission.component';
import { ChangeAccountPermissionModule } from './change-account-permission/change-account-permission.module';
import { CityStaffPermissionsRoutingModule } from './city-staff-permissions-routing.module';

import { CityStaffPermissionsComponent } from './city-staff-permissions.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { NewMemberModule } from './new-member/new-member.module';
import { RemoveMemberModule } from './remove-member/remove-member.module';

describe('CityStaffPermissionsComponent', () => {
  let component: CityStaffPermissionsComponent;
  let fixture: ComponentFixture<CityStaffPermissionsComponent>;
  let _getAllUsersService: GetAllUsersService;
  let _matDialog: MatDialog;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityStaffPermissionsComponent],
      imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        CityStaffPermissionsRoutingModule,
        MatMenuModule,
        LoadingBarModule,
        ErrorMsgModule,

        DialogModule,
        DialogResultModule,
        NewMemberModule,
        ChangeAccountPermissionModule,

        MatDialogModule,
        RemoveMemberModule,
      ],
    })
      .overrideComponent(CityStaffPermissionsComponent, {
        set: {
          providers: [
            {
              provide: GetAllUsersService,
              useClass: MockedGetAllUsersService,
            },
          ],
        },
      })
      .compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(CityStaffPermissionsComponent);
    component = fixture.componentInstance;
    _getAllUsersService = fixture.debugElement.injector.get(GetAllUsersService);
    _matDialog = fixture.debugElement.injector.get(MatDialog);

    dialogSpy = spyOn(
      fixture.debugElement.injector.get(MatDialog),
      'open'
    ).and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the loading bar when the petition is loading', () => {
    spyOnProperty(_getAllUsersService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(1);
  });

  it('should not show the loading bar if the petition is not loading', () => {
    spyOnProperty(_getAllUsersService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpLoadingBars =
      fixture.debugElement.nativeElement.querySelectorAll('dp-loading-bar');

    expect(dpLoadingBars.length).toBe(0);
  });

  it('should call getPetitionsAnonymous function when a "see more" button is clicked', () => {
    const getPetitionsSpy = spyOn(_getAllUsersService, 'getMembers');

    component.pageNumber();

    expect(getPetitionsSpy).toHaveBeenCalledOnceWith(true);
  });

  it('should show a new member dialog when a "openDialogNewMenber" function is called', () => {
    component.openDialogNewMember();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should show a new member dialog when a "openDialogNewMenber" function is called (afterClosed function is called to)', () => {
    component.openDialogChangeAccountPermission('id', AccessLevel.ADMIN);

    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should show a "see more" button when cursor value', () => {
    fixture.detectChanges();

    const dpPetitionCard =
      fixture.debugElement.nativeElement.querySelectorAll('button');

    expect(dpPetitionCard[1].textContent).toEqual(' See More ');
  });

  it('should show the error element if an error ocurred and is not loading', () => {
    spyOnProperty(_getAllUsersService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getAllUsersService, 'loading$', 'get').and.returnValue(
      of(false)
    );

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(1);
  });

  it('should not show the error element if an error ocurred and the component is loading', () => {
    spyOnProperty(_getAllUsersService, 'error$', 'get').and.returnValue(
      of('error')
    );

    spyOnProperty(_getAllUsersService, 'loading$', 'get').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    fixture.detectChanges();

    const dpErrorMsg =
      fixture.debugElement.nativeElement.querySelectorAll('dp-error-msg');

    expect(dpErrorMsg.length).toBe(0);
  });
});
class MockedGetAllUsersService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<UserConnection | undefined> {
    return of({
      __typename: 'UserConnection',
      items: [
        {
          __typename: 'User',
          email: 'example@test.com',
          firstName: 'exampleText',
          lastName: 'exampleTest',
          permissions: AccessLevel.ADMIN,
          username: 'exampleText',
        },
      ],
      token: 'token',
    });
  }
  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  getMembers(cursorFlag: boolean) {}
}
export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of([]),
    };
  }
}
