import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSignPetitionComponent } from './confirm-sign-petition.component';

describe('ConfirmSignPetitionComponent', () => {
  let component: ConfirmSignPetitionComponent;
  let fixture: ComponentFixture<ConfirmSignPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSignPetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmSignPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
