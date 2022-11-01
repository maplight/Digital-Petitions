import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCodeFormComponent } from './return-code-form.component';

describe('ReturnCodeFormComponent', () => {
  let component: ReturnCodeFormComponent;
  let fixture: ComponentFixture<ReturnCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
