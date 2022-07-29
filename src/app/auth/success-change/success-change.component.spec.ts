import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessChangeComponent } from './success-change.component';

describe('ConfirmComponent', () => {
  let component: SuccessChangeComponent;
  let fixture: ComponentFixture<SuccessChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessChangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
