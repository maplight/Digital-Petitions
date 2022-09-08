import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
