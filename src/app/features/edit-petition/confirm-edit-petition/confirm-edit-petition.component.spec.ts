import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditPetitionComponent } from './confirm-edit-petition.component';

describe('ConfirmEditPetitionComponent', () => {
  let component: ConfirmEditPetitionComponent;
  let fixture: ComponentFixture<ConfirmEditPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEditPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
