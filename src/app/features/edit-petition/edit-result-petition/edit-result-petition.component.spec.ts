import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResultPetitionComponent } from './edit-result-petition.component';

describe('ResultPetitionComponent', () => {
  let component: EditResultPetitionComponent;
  let fixture: ComponentFixture<EditResultPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditResultPetitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditResultPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
