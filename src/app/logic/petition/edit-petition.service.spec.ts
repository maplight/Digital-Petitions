import { TestBed } from '@angular/core/testing';

import { EditPetitionService } from './edit-petition.service';

describe('EditPetitionService', () => {
  let service: EditPetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
