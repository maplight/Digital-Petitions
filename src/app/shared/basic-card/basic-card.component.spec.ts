import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCardComponent } from './basic-card.component';

describe('DpBasicCardComponent', () => {
  let component: BasicCardComponent;
  let fixture: ComponentFixture<BasicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
