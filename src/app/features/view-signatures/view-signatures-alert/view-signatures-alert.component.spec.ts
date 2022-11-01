import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
    component.show = true;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(1);
  });

  it('not should show alert element when "show" variable is false', () => {
    component.show = false;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(0);
  });

  it('should show message received', () => {
    component.show = true;
    component.message = 'Example';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('p').textContent
    ).toEqual('Example');
  });

  it('should show correct style for "alert" type', () => {
    component.show = true;
    component.message = 'Example';
    component.type = 'alert';
    component.ngOnChanges();
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-[#FFEF98]');
  });

  it('should show correct style for "error" type', () => {
    component.show = true;
    component.message = 'Example';
    component.type = 'error';
    component.ngOnChanges();
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-red-500');
  });

  it('should show correct style for "success" type', () => {
    component.show = true;
    component.message = 'Example';
    component.type = 'success';
    component.ngOnChanges();
    fixture.detectChanges();
    let element: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('div');
    expect(element.className).toContain('bg-[#E6FFE2]');
  });

  it('not should show alert element when close button is clicked', () => {
    component.show = true;
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
    component.show = true;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(1);
    component.onCancelClick();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('div').length
    ).toEqual(0);
  });
});
