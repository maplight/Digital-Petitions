import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { AccountService } from '../../account-service/account.service';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let _accountService: AccountService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    })
      .overrideComponent(AvatarComponent, {
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
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    _accountService = fixture.debugElement.injector.get(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show uppercase of first letter of family name and first letter of given name', () => {
    spyOnProperty(_accountService, 'currentUser').and.returnValue({
      attributes: {
        'custom:access_group': 'admin',
        address: '',
        email: '',
        email_verified: true,
        family_name: 'Example',
        given_name: 'Name',
        sub: '',
      },
      challengeName: 'NEW_PASSWORD_REQUIRED',
      username: '',
    });
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector('p');
    expect(element.textContent).toContain('NE');
  });
});
