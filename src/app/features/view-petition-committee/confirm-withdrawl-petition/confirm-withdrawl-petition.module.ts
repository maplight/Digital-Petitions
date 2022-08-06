import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ConfirmWithdrawlPetitionComponent],
  imports: [
    CommonModule,
    BasicAlertModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [ConfirmWithdrawlPetitionComponent],
})
export class ConfirmWithdrawlPetitionModule {}