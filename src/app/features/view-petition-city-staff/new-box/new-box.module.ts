import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoxComponent } from './new-box.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [NewBoxComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NewBoxComponent],
})
export class NewBoxModule {}
