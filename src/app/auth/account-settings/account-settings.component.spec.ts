import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/account-service/account.service';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { CognitoUserFacade } from 'src/app/shared/models/auth/user';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';

import { AccountSettingsComponent } from './account-settings.component';

describe('CommitteeAccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let _accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      imports: [
        CommonModule,
        AccountSettingsRoutingModule,
        ReturnLinkModule,
        BasicCardModule,
        MatButtonModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    })
      .overrideComponent(AccountSettingsComponent, {
        set: {
          providers: [
            {
              provide: AccountService,
              useClass: MockedAccountService,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    _accountService = fixture.debugElement.injector.get(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must show the user email', () => {
    fixture.detectChanges();
    let elements = fixture.debugElement.nativeElement.querySelectorAll('p');
    fixture.detectChanges();
    expect(elements[3].textContent).toEqual('email@test.com');
  });

  it('must show the user name', () => {
    fixture.detectChanges();
    let elements = fixture.debugElement.nativeElement.querySelectorAll('p');
    fixture.detectChanges();
    expect(elements[7].textContent).toEqual(' first name last name ');
  });
});

class MockedAccountService {
  public get currentUser(): CognitoUserFacade | undefined {
    return {
      attributes: {
        sub: 'textExample',
        address: 'textExample',
        email_verified: true,
        given_name: 'first name',
        'custom:access_group': 'admin',
        family_name: 'last name',
        email: 'email@test.com',
      },
      challengeName: 'NEW_PASSWORD_REQUIRED',
      username: 'username',
    };
  }
}
const dialogMock = {
  close: () => {},
};
