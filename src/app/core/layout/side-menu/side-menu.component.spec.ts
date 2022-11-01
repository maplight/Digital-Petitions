import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { AccountService } from '../../account-service/account.service';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let _accountService: AccountService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
    })
      .overrideComponent(SideMenuComponent, {
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
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    _accountService = fixture.debugElement.injector.get(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Site Admin option when the authenticated user it a administrator', () => {
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
    let element = fixture.debugElement.nativeElement.querySelectorAll('a');
    expect(element.length).toEqual(2);
  });

  it('should not show Site Admin option when the authenticated user it diferent a administrator', () => {
    spyOnProperty(_accountService, 'currentUser').and.returnValue({
      attributes: {
        'custom:access_group': 'city_staff_guest',
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
    let element = fixture.debugElement.nativeElement.querySelectorAll('a');
    expect(element.length).toEqual(1);
  });
});
