import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangeModalComponent } from './email-change-modal.component';

describe('EmailChangeModalComponent', () => {
  let component: EmailChangeModalComponent;
  let fixture: ComponentFixture<EmailChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailChangeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
