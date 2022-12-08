import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmWithdrawlPetitionComponent } from './confirm-withdrawl-petition.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicAlertModule } from 'src/app/shared/basic-alert/basic-alert.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { WithdrawPetitionService } from 'src/app/logic/petition/withdraw-petition.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

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
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [ConfirmWithdrawlPetitionComponent],
})
export class ConfirmWithdrawlPetitionModule {}
