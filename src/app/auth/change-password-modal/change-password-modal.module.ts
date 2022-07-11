import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class ChangePasswordModalModule {}
