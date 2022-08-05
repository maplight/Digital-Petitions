import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetitionInactiveComponent } from './view-petition-inactive.component';

describe('ViewPetitionComponent', () => {
  let component: ViewPetitionInactiveComponent;
  let fixture: ComponentFixture<ViewPetitionInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPetitionInactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPetitionInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
