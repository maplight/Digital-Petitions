import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailChangeModalComponent } from './confirm-email-change-modal.component';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ConfirmChangeEmailService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [ConfirmEmailChangeModalComponent],
  imports: [
    CommonModule,
    DialogResultModule,
    BasicModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    LoadingBarModule,
  ],
})
export class ConfirmEmailChangeModalModule {}
