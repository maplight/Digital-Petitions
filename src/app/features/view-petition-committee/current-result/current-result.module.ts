import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentResultComponent } from './current-result.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

@NgModule({
  declarations: [CurrentResultComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [CurrentResultComponent],
})
export class CurrentResultModule {}
