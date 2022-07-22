import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailChangeModalComponent } from './email-change-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmEmailChangeModalModule } from '../confirm-email-change-modal/confirm-email-change-modal.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeEmailService } from 'src/app/logic/auth/exports';

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
  ],
  providers: [ChangeEmailService],
})
export class EmailChangeModalModule {}
