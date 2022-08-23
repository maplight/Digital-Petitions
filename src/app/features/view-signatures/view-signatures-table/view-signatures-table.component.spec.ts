import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignaturesTableComponent } from './view-signatures-table.component';

describe('ViewSignaturesTableComponent', () => {
  let component: ViewSignaturesTableComponent;
  let fixture: ComponentFixture<ViewSignaturesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSignaturesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
