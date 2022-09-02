import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
