import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertWithdrawlPetitionComponent } from './alert-withdrawl-petition.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';

@NgModule({
  declarations: [AlertWithdrawlPetitionComponent],
  imports: [CommonModule, BasicAlertModule, MatButtonModule, MatDialogModule],
  exports: [AlertWithdrawlPetitionComponent],
})
export class AlertWithdrawlPetitionModule {}
