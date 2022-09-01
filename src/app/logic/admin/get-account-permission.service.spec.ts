import { TestBed } from '@angular/core/testing';

import { GetAccountPermissionService } from './get-account-permission.service';

describe('GetAccountPermissionService', () => {
  let service: GetAccountPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAccountPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
