import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';

@NgModule({
  declarations: [ChangePasswordModalComponent],
  imports: [CommonModule, BasicModalModule],
})
export class ChangePasswordModalModule {}
