import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';

describe('ViewPetitionCommitteeComponent', () => {
  let component: ViewPetitionCommitteeComponent;
  let fixture: ComponentFixture<ViewPetitionCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPetitionCommitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPetitionCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
