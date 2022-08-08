import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlResultComponent } from './withdrawl-result.component';

describe('ResultPetitionComponent', () => {
  let component: WithdrawlResultComponent;
  let fixture: ComponentFixture<WithdrawlResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawlResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawlResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
