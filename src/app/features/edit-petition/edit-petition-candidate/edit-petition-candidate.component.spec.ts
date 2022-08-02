import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetitionCandidateComponent } from './edit-petition-candidate.component';

describe('EditPetitionCandidateComponent', () => {
  let component: EditPetitionCandidateComponent;
  let fixture: ComponentFixture<EditPetitionCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPetitionCandidateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPetitionCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
