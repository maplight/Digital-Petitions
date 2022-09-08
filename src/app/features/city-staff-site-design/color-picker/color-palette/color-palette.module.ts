import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteComponent } from './color-palette.component';

@NgModule({
  declarations: [ColorPaletteComponent],
  imports: [CommonModule],
  exports: [ColorPaletteComponent],
})
export class ColorPaletteModule {}
