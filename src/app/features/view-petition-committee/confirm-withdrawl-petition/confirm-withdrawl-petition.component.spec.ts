import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition.component';

describe('ConfirmEditPetitionComponent', () => {
  let component: ConfirmWithdrawlPetitionComponent;
  let fixture: ComponentFixture<ConfirmWithdrawlPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmWithdrawlPetitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmWithdrawlPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
