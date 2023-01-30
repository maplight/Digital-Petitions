import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenyAlertComponent } from './deny-alert.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [DenyAlertComponent],
  imports: [CommonModule, MatDialogModule, BasicAlertModule, MatButtonModule],
  exports: [DenyAlertComponent],
})
export class DenyAlertModule {}
