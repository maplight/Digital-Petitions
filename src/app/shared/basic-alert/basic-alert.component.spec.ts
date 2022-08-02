import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAlertComponent } from './basic-alert.component';

describe('BasicModalComponent', () => {
  let component: BasicAlertComponent;
  let fixture: ComponentFixture<BasicAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
