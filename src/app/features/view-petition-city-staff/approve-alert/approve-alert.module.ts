import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveAlertComponent } from './approve-alert.component';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [ApproveAlertComponent],
  imports: [CommonModule, BasicAlertModule, MatDialogModule, MatButtonModule],
  exports: [ApproveAlertComponent],
})
export class ApproveAlertModule {}
