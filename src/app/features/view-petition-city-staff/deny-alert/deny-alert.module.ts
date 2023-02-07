import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenyAlertComponent } from './deny-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DenyAlertComponent],
  imports: [CommonModule, MatDialogModule, BasicAlertModule, MatButtonModule],
  exports: [DenyAlertComponent],
})
export class DenyAlertModule {}
