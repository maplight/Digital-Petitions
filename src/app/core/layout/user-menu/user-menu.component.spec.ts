import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SignOutService } from 'src/app/logic/auth/sign-out.service';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { AvatarModule } from '../avatar/avatar.module';

import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let _signOutService: SignOutService;
  let _matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        AvatarModule,
        DialogResultModule,
        DialogModule,
        MatDialogModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    })
      .overrideComponent(UserMenuComponent, {
        set: {
          providers: [
            {
              provide: SignOutService,
              useClass: MockedSignOutService,
            },
            {
              provide: MatDialog,
              useValue: dialogMock,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    _signOutService = fixture.debugElement.injector.get(SignOutService);
    _matDialog = fixture.debugElement.injector.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call open function in MatDialog when a error response is received', () => {
    spyOnProperty(_signOutService, 'error$').and.returnValue(of('error'));
    let resultSpy = spyOn(dialogMock, 'open');
    fixture.detectChanges();
    expect(resultSpy).toHaveBeenCalled();
  });
});

class MockedSignOutService {
  public get error$(): Observable<string | undefined> {
    return new Observable();
  }

  public get success$(): Observable<string | undefined> {
    return new Observable();
  }

  public get loading$(): Observable<boolean> {
    return new Observable();
  }

  signOut() {}
}

const dialogMock = {
  close: () => {},
  open: () => {},
};
