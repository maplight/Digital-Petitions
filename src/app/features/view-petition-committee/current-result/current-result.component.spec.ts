import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentResultComponent } from './current-result.component';

describe('CurrentResultComponent', () => {
  let component: CurrentResultComponent;
  let fixture: ComponentFixture<CurrentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
