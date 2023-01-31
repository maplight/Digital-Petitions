import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEditPetitionComponent } from './confirm-edit-petition.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';

@NgModule({
  declarations: [ConfirmEditPetitionComponent],
  imports: [CommonModule, BasicAlertModule, MatButtonModule, MatDialogModule],
  exports: [ConfirmEditPetitionComponent],
})
export class ConfirmEditPetitionModule {}
