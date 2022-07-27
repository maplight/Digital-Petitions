import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetitionCandidateComponent } from './new-petition-candidate.component';

describe('NewPetitionCandidateComponent', () => {
  let component: NewPetitionCandidateComponent;
  let fixture: ComponentFixture<NewPetitionCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPetitionCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPetitionCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
