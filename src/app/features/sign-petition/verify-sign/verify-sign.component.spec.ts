import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySignComponent } from './verify-sign.component';

describe('VerifySignComponent', () => {
  let component: VerifySignComponent;
  let fixture: ComponentFixture<VerifySignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
