import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModalComponent } from './basic-modal.component';

@NgModule({
  declarations: [BasicModalComponent],
  imports: [CommonModule],
  exports: [BasicModalComponent],
})
export class BasicModalModule {}
