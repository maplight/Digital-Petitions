import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAlertComponent } from './basic-alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BasicAlertComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [BasicAlertComponent],
})
export class BasicAlertModule {}
