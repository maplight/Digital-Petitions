import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignaturesAlertComponent } from './view-signatures-alert.component';

describe('ViewSignaturesAlertComponent', () => {
  let component: ViewSignaturesAlertComponent;
  let fixture: ComponentFixture<ViewSignaturesAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSignaturesAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
