import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentResultComponent } from './current-result.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [CurrentResultComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [CurrentResultComponent],
})
export class CurrentResultModule {}
