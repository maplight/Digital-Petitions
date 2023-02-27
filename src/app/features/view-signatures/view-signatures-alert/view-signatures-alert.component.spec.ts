import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

import { ViewSignaturesAlertComponent } from './view-signatures-alert.component';

describe('ViewSignaturesAlertComponent', () => {
  let component: ViewSignaturesAlertComponent;
  let fixture: ComponentFixture<ViewSignaturesAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSignaturesAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesAlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert element when "show" variable is true', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(1);
  });

  it('not should show alert element when "show" variable is false', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(0);
  });

  it('should show message received', () => {
    component.data = {
      message: 'Example',
      type: 'alert',
    };
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('p').textContent
    ).toEqual('Example');
  });

  it('should show correct style for "alert" type', () => {
    component.data = {
      message: 'Example',
      type: 'alert',
    };
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-[#FFEF98]');
  });

  it('should show correct style for "error" type', () => {
    component.data = {
      message: 'Example',
      type: 'error',
    };
    component.ngOnChanges({});
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-red-500');
  });

  it('should show correct style for "success" type', () => {
    component.data = {
      message: 'Example',
      type: 'success',
    };
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-[#E6FFE2]');
  });

  it('not should show alert element when close button is clicked', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(1);
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(0);
  });

  it('not should show alert element when "onCancel" function is called', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(1);

    const sub = new ReplaySubject<boolean>();
    component.onCancelClick(sub);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(3);
  });
});
