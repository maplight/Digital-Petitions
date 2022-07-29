import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetitionComponent } from './edit-petition.component';

describe('EditPetitionComponent', () => {
  let component: EditPetitionComponent;
  let fixture: ComponentFixture<EditPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
