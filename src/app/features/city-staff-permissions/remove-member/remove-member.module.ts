import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveMemberComponent } from './remove-member.component';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [RemoveMemberComponent],
  imports: [
    CommonModule,
    BasicAlertModule,
    DialogModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [RemoveMemberComponent],
})
export class RemoveMemberModule {}
