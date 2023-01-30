import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAlertComponent } from './basic-alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [BasicAlertComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [BasicAlertComponent],
})
export class BasicAlertModule {}
