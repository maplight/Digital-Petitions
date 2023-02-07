import { TestBed } from '@angular/core/testing';

import { ViewPetitionNameService } from './view-petition-name.service';

describe('ViewPetitionNameService', () => {
  let service: ViewPetitionNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewPetitionNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
