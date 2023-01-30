import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicModalComponent } from './basic-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [BasicModalComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  exports: [BasicModalComponent],
})
export class BasicModalModule {}
