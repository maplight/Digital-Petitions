import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PetitionType } from 'src/app/core/api/API';
import { FilterByTypeData } from '../models/filter/filter-by-type';

import { FilterByCategoryComponent } from './filter-by-category.component';

describe('BasicFilterComponent', () => {
  let component: FilterByCategoryComponent;
  let fixture: ComponentFixture<FilterByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterByCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one mat-chip element for each item in FilterByTypeData when view mode is "both"', () => {
    component.filterType = FilterByTypeData;
    component.mode = 'Both';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-chip').length
    ).toEqual(FilterByTypeData.length);
  });

  it('should show one mat-option element for each item in FilterByTypeData when view mode is "Select"', () => {
    component.filterType = FilterByTypeData;
    component.mode = 'Select';
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll('mat-option').length
    ).toEqual(FilterByTypeData.length);
  });

  it('should show the name of filter recived from container component', () => {
    component.filterType = FilterByTypeData;
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
    component.filterType = FilterByTypeData;
    component.filterName = 'Filter Example';
    component.mode = 'Select';
    fixture.detectChanges();
    fixture.debugElement
      .queryAll(By.css('mat-option'))[0]
      .triggerEventHandler('click');
  });
});
