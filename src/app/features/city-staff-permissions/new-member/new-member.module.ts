import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMemberComponent } from './new-member.component';
import { BasicModalComponent } from 'src/app/shared/basic-modal/basic-modal.component';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule({
  declarations: [NewMemberComponent],
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
    DialogModule,
    DialogResultModule,
    MatSelectModule,
  ],
  exports: [NewMemberComponent],
})
export class NewMemberModule {}
