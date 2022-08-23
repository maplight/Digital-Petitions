import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CualifiedBoxComponent } from './cualified-box.component';

describe('CualifiedBoxComponent', () => {
  let component: CualifiedBoxComponent;
  let fixture: ComponentFixture<CualifiedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CualifiedBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CualifiedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
