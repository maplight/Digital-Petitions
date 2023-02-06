import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveAlertComponent } from './approve-alert.component';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ApproveAlertComponent],
  imports: [CommonModule, BasicAlertModule, MatDialogModule, MatButtonModule],
  exports: [ApproveAlertComponent],
})
export class ApproveAlertModule {}
