import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [LoadingBarComponent],
})
export class LoadingBarModule {}
