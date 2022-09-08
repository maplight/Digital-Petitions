import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSliderComponent } from './color-slider.component';

@NgModule({
  declarations: [ColorSliderComponent],
  imports: [CommonModule],
  exports: [ColorSliderComponent],
})
export class ColorSliderModule {}
