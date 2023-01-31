import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

@NgModule({
  declarations: [StatusComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [StatusComponent],
})
export class StatusModule {}
