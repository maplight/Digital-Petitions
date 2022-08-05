import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [StatusComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [StatusComponent],
})
export class StatusModule {}
