import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogResultModule } from '../../shared/dialog-result/dialog-result.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangePasswordService } from 'src/app/logic/change-password.service';

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
  ],
  providers: [ChangePasswordService],
})
export class ChangePasswordModalModule {}
