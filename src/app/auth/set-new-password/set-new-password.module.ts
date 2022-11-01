import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetNewPasswordComponent } from './set-new-password.component';
import { SetNewPasswordRoutingModule } from './set-new-password-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [SetNewPasswordComponent],
  imports: [
    CommonModule,
    SetNewPasswordRoutingModule,
    ReturnLinkModule,
    MatProgressBarModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class SetNewPasswordModule {}
