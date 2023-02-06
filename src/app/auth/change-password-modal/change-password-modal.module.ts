import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { DialogResultModule } from '../../shared/dialog-result/dialog-result.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ChangePasswordService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [ChangePasswordModalComponent],
  imports: [
    CommonModule,
    BasicModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    DialogResultModule,
    MatProgressBarModule,
    LoadingBarModule,
  ],
})
export class ChangePasswordModalModule {}
