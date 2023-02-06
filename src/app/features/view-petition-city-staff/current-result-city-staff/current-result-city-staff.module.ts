import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentResultCityStaffComponent } from './current-result-city-staff.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

@NgModule({
  declarations: [CurrentResultCityStaffComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [CurrentResultCityStaffComponent],
})
export class CurrentResultCityStaffModule {}
