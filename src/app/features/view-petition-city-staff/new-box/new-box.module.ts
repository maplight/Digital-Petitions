import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoxComponent } from './new-box.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NewBoxComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NewBoxComponent],
})
export class NewBoxModule {}
