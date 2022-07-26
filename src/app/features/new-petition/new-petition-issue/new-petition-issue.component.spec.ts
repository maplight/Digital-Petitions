import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPetitionIssueComponent } from './new-petition-issue.component';

describe('NewPetitionIssueComponent', () => {
  let component: NewPetitionIssueComponent;
  let fixture: ComponentFixture<NewPetitionIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPetitionIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPetitionIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
