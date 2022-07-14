import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailChangeModalComponent } from './confirm-email-change-modal.component';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
})
export class ConfirmEmailChangeModalModule {}
