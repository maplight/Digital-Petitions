import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailChangeModalComponent } from './email-change-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmEmailChangeModalModule } from '../confirm-email-change-modal/confirm-email-change-modal.module';

@NgModule({
  declarations: [EmailChangeModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmEmailChangeModalModule,
    BasicModalModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class EmailChangeModalModule {}
