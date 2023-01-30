import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';

@NgModule({
  declarations: [AlertWithdrawlPetitionComponent],
  imports: [CommonModule, BasicAlertModule, MatButtonModule, MatDialogModule],
  exports: [AlertWithdrawlPetitionComponent],
})
export class AlertWithdrawlPetitionModule {}
