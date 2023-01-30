import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
