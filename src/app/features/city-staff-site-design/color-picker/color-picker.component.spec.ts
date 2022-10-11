import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a color when color-palette component emit', () => {
    component.eventColor.asObservable().subscribe((data) => {
      expect(data).toEqual('#F1F1F1');
    });
    fixture.debugElement
      .query(By.css('dp-color-palette'))
      .triggerEventHandler('color', '#F1F1F1');
  });
});
