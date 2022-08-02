import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEditPetitionComponent } from './confirm-edit-petition.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';

@NgModule({
  declarations: [ConfirmEditPetitionComponent],
  imports: [CommonModule, BasicAlertModule, MatButtonModule, MatDialogModule],
  exports: [ConfirmEditPetitionComponent],
})
export class ConfirmEditPetitionModule {}
