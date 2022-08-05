import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from './step-indicator.component';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';

@NgModule({
  declarations: [StepIndicatorComponent],
  imports: [CommonModule],
  exports: [StepIndicatorComponent],
  providers: [StepIndicatorService],
})
export class StepIndicatorModule {}
