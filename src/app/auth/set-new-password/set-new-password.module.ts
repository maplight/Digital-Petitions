import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetNewPasswordComponent } from './set-new-password.component';
import { SetNewPasswordRoutingModule } from './set-new-password-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { FormModule } from './form/form.module';
import { ConfirmModule } from './confirm/confirm.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CheckTokenFpService } from 'src/app/logic/auth/exports';

@NgModule({
  declarations: [SetNewPasswordComponent],
  imports: [
    CommonModule,
    SetNewPasswordRoutingModule,
    ReturnLinkModule,
    FormModule,
    ConfirmModule,
    MatProgressBarModule,
  ],
  providers: [CheckTokenFpService]
})
export class SetNewPasswordModule {}
