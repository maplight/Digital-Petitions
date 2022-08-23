import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoxComponent } from './new-box.component';

describe('NewBoxComponent', () => {
  let component: NewBoxComponent;
  let fixture: ComponentFixture<NewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
