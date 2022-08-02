import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutPipe } from './cut.pipe';

@NgModule({
  declarations: [CutPipe],
  imports: [CommonModule],
  exports: [CutPipe],
})
export class CutModule {}
