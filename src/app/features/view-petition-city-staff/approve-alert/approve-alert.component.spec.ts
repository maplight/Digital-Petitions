import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAlertComponent } from './approve-alert.component';

describe('AproveAlertComponent', () => {
  let component: ApproveAlertComponent;
  let fixture: ComponentFixture<ApproveAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('evaluates that the "dp-basic-alert" component exists', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('dp-basic-alert');
    expect(element).toBeTruthy();
  });

  it('evaluates that two are three buttons', () => {
    const element =
      fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(element.length).toBe(2);
  });
});
