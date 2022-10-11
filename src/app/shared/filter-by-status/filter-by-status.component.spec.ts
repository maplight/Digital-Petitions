import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterByStatusAny } from '../models/filter/filter-by-status';

import { FilterByStatusComponent } from './filter-by-status.component';

describe('BasicFilterComponent', () => {
  let component: FilterByStatusComponent;
  let fixture: ComponentFixture<FilterByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one mat-chip element for each item in FilterByStatusAny when view mode is "both"', () => {
    component.filterStatus = FilterByStatusAny;
    component.mode = 'Both';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-chip').length
    ).toEqual(FilterByStatusAny.length);
  });

  it('should show one mat-option element for each item in FilterByTypeData when view mode is "Select"', () => {
    component.filterStatus = FilterByStatusAny;
    component.mode = 'Select';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-option').length
    ).toEqual(FilterByStatusAny.length);
  });

  it('should show the name of filter recived from container component', () => {
    component.filterStatus = FilterByStatusAny;
    component.filterName = 'Filter Example';
    component.mode = 'Select';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('mat-label').textContent
    ).toEqual('Filter Example');
  });

  it('should emit a value selected in select element when it is clicked', () => {
    component.event.asObservable().subscribe((data) => {
      expect(data).toEqual('ANY');
    });
    component.filterStatus = FilterByStatusAny;
    component.filterName = 'Filter Example';
    component.mode = 'Select';
    fixture.detectChanges();
    fixture.debugElement
      .queryAll(By.css('mat-option'))[0]
      .triggerEventHandler('click');
  });
});
