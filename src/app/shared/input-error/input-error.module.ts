import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './input-error.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InputErrorComponent],
  imports: [CommonModule, MatIconModule],
  exports: [InputErrorComponent],
})
export class InputErrorModule {}
