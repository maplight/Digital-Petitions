import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { ColorSliderModule } from './color-slider/color-slider.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    CommonModule,
    ColorPaletteModule,
    ColorSliderModule,
    FormsModule,
    MatExpansionModule,
  ],
  exports: [ColorPickerComponent],
})
export class ColorPickerModule {}
