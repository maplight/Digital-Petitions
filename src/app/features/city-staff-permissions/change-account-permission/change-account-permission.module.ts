import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeAccountPermissionComponent } from './change-account-permission.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ChangeAccountPermissionComponent],
  imports: [
    CommonModule,
    BasicModalModule,
    LoadingBarModule,
    ErrorMsgModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    DialogModule,
    DialogResultModule,
    MatSelectModule,
  ],
  exports: [ChangeAccountPermissionComponent],
})
export class ChangeAccountPermissionModule {}
