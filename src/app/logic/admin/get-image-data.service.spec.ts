import { TestBed } from '@angular/core/testing';

import { GetImageDataService } from './get-image-data.service';

describe('GetImageDataService', () => {
  let service: GetImageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetImageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
