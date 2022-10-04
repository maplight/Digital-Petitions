import { TestBed } from '@angular/core/testing';

import { GetAccountPermissionService } from './get-account-permission.service';
import { AdminService } from './admin.service';

describe('GetAccountPermissionService', () => {
  let service: GetAccountPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetAccountPermissionService,
        { provide: AdminService, useClass: MockedAdminService },
      ],
    });
    service = TestBed.inject(GetAccountPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
class MockedAdminService {}
