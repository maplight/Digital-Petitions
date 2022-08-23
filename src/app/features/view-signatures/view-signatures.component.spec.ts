import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignaturesComponent } from './view-signatures.component';

describe('ViewSignaturesComponent', () => {
  let component: ViewSignaturesComponent;
  let fixture: ComponentFixture<ViewSignaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSignaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
