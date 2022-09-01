import { TestBed } from '@angular/core/testing';

import { ChangeAccountPermissionService } from './change-account-permission.service';

describe('ChangeAccountPermissionService', () => {
  let service: ChangeAccountPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeAccountPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
