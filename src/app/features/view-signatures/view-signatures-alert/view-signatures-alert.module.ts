import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignaturesAlertComponent } from './view-signatures-alert.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ViewSignaturesAlertComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ViewSignaturesAlertComponent],
})
export class ViewSignaturesAlertModule {}
