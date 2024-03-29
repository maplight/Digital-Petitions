import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ForgotPasswordService } from 'src/app/logic/auth/exports';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    ReturnLinkModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class ForgotPasswordModule {}
