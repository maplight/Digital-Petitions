import { TestBed } from '@angular/core/testing';

import { StepIndicatorService } from './step-indicator.service';

describe('StepIndicatorService', () => {
  let service: StepIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
