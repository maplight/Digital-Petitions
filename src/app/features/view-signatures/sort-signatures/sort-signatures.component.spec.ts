import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSignaturesComponent } from './sort-signatures.component';

describe('SortSignaturesComponent', () => {
  let component: SortSignaturesComponent;
  let fixture: ComponentFixture<SortSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortSignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
