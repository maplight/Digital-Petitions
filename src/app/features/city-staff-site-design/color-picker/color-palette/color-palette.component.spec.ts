import { SimpleChanges } from '@angular/core';
import { SimpleChange } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorPaletteComponent } from './color-palette.component';

describe('ColorPaletteComponent', () => {
  let component: ColorPaletteComponent;
  let fixture: ComponentFixture<ColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit color #3f3f3f when trigger the "mousemove" event in 75x75 position and a blue seed is received', () => {
    let canvasElement = fixture.debugElement.query(By.css('canvas'));

    component.hue = 'rgba(0,0,255,1)';
    component.ngAfterViewInit();
    component.ngOnChanges({
      hue: new SimpleChange(undefined, 'rgba(0,0,255,1)', false),
    });
    fixture.detectChanges();
    canvasElement.triggerEventHandler('mousedown', {
      offsetX: 75,
      offsetY: 75,
    });
    component.color.asObservable().subscribe((data) => {
      expect(data).toEqual('#3f3f7f');
    });

    canvasElement.triggerEventHandler('mousemove', {
      offsetX: 75,
      offsetY: 75,
    });
  });

  it('should emit color #40407f when trigger the "mousedown" event in 75x75 position and a blue seed is received', () => {
    let canvasElement = fixture.debugElement.query(By.css('canvas'));

    component.hue = 'rgba(0,0,255,1)';
    component.ngAfterViewInit();
    component.ngOnChanges({
      hue: new SimpleChange(undefined, 'rgba(0,0,255,1)', false),
    });
    fixture.detectChanges();
    component.color.asObservable().subscribe((data) => {
      expect(data).toEqual('#40407f');
    });
    canvasElement.triggerEventHandler('mousedown', {
      offsetX: 75,
      offsetY: 75,
    });
  });

  it('should display a grayscale color palette if no "seed" color is received', () => {
    let canvasElement = fixture.debugElement.query(
      By.css('canvas')
    ) as ElementRef<HTMLCanvasElement>;
    let ctx: CanvasRenderingContext2D | null =
      canvasElement.nativeElement.getContext('2d');
    fixture.detectChanges();
    if (!!ctx) {
      //first vertex
      let imageData1 = ctx.getImageData(0, 0, 1, 1).data;
      let color1: string =
        '#' +
        imageData1[0].toString(16) +
        imageData1[1].toString(16) +
        imageData1[2].toString(16);

      //second vertex
      let imageData2 = ctx.getImageData(149, 0, 1, 1).data;
      let color2: string =
        '#' +
        imageData2[0].toString(16) +
        imageData2[1].toString(16) +
        imageData2[2].toString(16);

      //third vertex
      let imageData3 = ctx.getImageData(0, 149, 1, 1).data;
      let color3: string =
        '#' +
        imageData3[0].toString(16) +
        imageData3[1].toString(16) +
        imageData3[2].toString(16);

      //fourth vertex
      let imageData4 = ctx.getImageData(149, 149, 1, 1).data;
      let color4: string =
        '#' +
        imageData4[0].toString(16) +
        imageData4[1].toString(16) +
        imageData4[2].toString(16);

      //test
      expect(color1).toEqual('#fefefe');
      expect(color2).toEqual('#fefefe');
      expect(color3).toEqual('#111');
      expect(color4).toEqual('#111');
    }
  });

  it('should display a bluescale color palette if a blue "seed" color is received', () => {
    let canvasElement = fixture.debugElement.query(
      By.css('canvas')
    ) as ElementRef<HTMLCanvasElement>;
    let ctx: CanvasRenderingContext2D | null =
      canvasElement.nativeElement.getContext('2d');
    component.hue = 'rgba(0,0,255,1)';
    component.ngAfterViewInit();
    component.ngOnChanges({
      hue: new SimpleChange(undefined, 'rgba(0,0,255,1)', false),
    });
    fixture.detectChanges();
    if (!!ctx) {
      //first vertex
      let imageData1 = ctx.getImageData(75, 75, 1, 1).data;
      let color1: string =
        '#' +
        imageData1[0].toString(16) +
        imageData1[1].toString(16) +
        imageData1[2].toString(16);

      expect(color1).toEqual('#40407f');
    }
  });

  it('should display a redscale color palette if a red "seed" color is received', () => {
    let canvasElement = fixture.debugElement.query(
      By.css('canvas')
    ) as ElementRef<HTMLCanvasElement>;
    let ctx: CanvasRenderingContext2D | null =
      canvasElement.nativeElement.getContext('2d');
    component.hue = 'rgba(255,0,0,1)';
    component.ngAfterViewInit();
    component.ngOnChanges({
      hue: new SimpleChange(undefined, 'rgba(255,0,0,1)', false),
    });
    fixture.detectChanges();
    if (!!ctx) {
      //first vertex
      let imageData1 = ctx.getImageData(75, 75, 1, 1).data;
      let color1: string =
        '#' +
        imageData1[0].toString(16) +
        imageData1[1].toString(16) +
        imageData1[2].toString(16);

      expect(color1).toEqual('#7f4040');
    }
  });

  it('should display a greenscale color palette if a green "seed" color is received', () => {
    let canvasElement = fixture.debugElement.query(
      By.css('canvas')
    ) as ElementRef<HTMLCanvasElement>;
    let ctx: CanvasRenderingContext2D | null =
      canvasElement.nativeElement.getContext('2d');
    component.hue = 'rgba(0,255,0,1)';
    component.ngAfterViewInit();
    component.ngOnChanges({
      hue: new SimpleChange(undefined, 'rgba(0,255,0,1)', false),
    });
    fixture.detectChanges();
    if (!!ctx) {
      //first vertex
      let imageData1 = ctx.getImageData(75, 75, 1, 1).data;
      let color1: string =
        '#' +
        imageData1[0].toString(16) +
        imageData1[1].toString(16) +
        imageData1[2].toString(16);

      expect(color1).toEqual('#407f40');
    }
  });
});
