import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorSliderComponent } from './color-slider.component';

describe('ColorSliderComponent', () => {
  let component: ColorSliderComponent;
  let fixture: ComponentFixture<ColorSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit color rgba(0,255,245,1) when trigger the "mousemove" event in 20x75 position', () => {
    let canvasElement = fixture.debugElement.query(By.css('canvas'));

    component.ngAfterViewInit();

    fixture.detectChanges();
    canvasElement.triggerEventHandler('mousedown', {
      offsetX: 1,
      offsetY: 75,
    });
    component.color.asObservable().subscribe((data) => {
      expect(data).toEqual('rgba(0,255,245,1)');
    });

    canvasElement.triggerEventHandler('mousemove', {
      offsetX: 20,
      offsetY: 75,
    });
  });

  it('should emit color rgba(0,255,245,1) when trigger the "mousedown" event in 20x75 position', () => {
    let canvasElement = fixture.debugElement.query(By.css('canvas'));

    component.ngAfterViewInit();

    fixture.detectChanges();
    component.color.asObservable().subscribe((data) => {
      expect(data).toEqual('rgba(0,255,245,1)');
    });
    canvasElement.triggerEventHandler('mousedown', {
      offsetX: 20,
      offsetY: 75,
    });
  });
});
