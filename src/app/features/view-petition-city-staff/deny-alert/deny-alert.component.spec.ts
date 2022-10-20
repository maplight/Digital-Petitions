import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyAlertComponent } from './deny-alert.component';

describe('DenyAlertComponent', () => {
  let component: DenyAlertComponent;
  let fixture: ComponentFixture<DenyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenyAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DenyAlertComponent);
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
