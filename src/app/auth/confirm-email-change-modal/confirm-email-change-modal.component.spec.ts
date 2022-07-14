import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailChangeModalComponent } from './confirm-email-change-modal.component';

describe('ConfirmEmailChangeModalComponent', () => {
  let component: ConfirmEmailChangeModalComponent;
  let fixture: ComponentFixture<ConfirmEmailChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEmailChangeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
