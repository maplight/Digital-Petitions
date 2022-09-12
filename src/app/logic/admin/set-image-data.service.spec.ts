import { TestBed } from '@angular/core/testing';

import { SetImageDataService } from './set-image-data.service';

describe('SetImageDataService', () => {
  let service: SetImageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetImageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
