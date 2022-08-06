import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionViewComponent } from './petition-view.component';

describe('PetitionCardComponent', () => {
  let component: PetitionViewComponent;
  let fixture: ComponentFixture<PetitionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetitionViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PetitionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
