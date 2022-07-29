import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetitionIssueComponent } from './edit-petition-issue.component';

describe('EditPetitionIssueComponent', () => {
  let component: EditPetitionIssueComponent;
  let fixture: ComponentFixture<EditPetitionIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPetitionIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPetitionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
