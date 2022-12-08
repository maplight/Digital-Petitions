import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailChangeModalComponent } from './email-change-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmEmailChangeModalModule } from '../confirm-email-change-modal/confirm-email-change-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ChangeEmailService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [EmailChangeModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmEmailChangeModalModule,
    DialogResultModule,
    BasicModalModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    LoadingBarModule,
  ],
})
export class EmailChangeModalModule {}
