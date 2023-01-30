import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogResultComponent } from './dialog-result.component';
import { MatIconModule } from '@angular/material/icon';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [DialogResultComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BasicModalModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [DialogResultComponent],
})
export class DialogResultModule {}
