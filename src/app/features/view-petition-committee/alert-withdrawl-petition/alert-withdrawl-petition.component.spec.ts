import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition.component';

describe('ConfirmEditPetitionComponent', () => {
  let component: AlertWithdrawlPetitionComponent;
  let fixture: ComponentFixture<AlertWithdrawlPetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertWithdrawlPetitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertWithdrawlPetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
