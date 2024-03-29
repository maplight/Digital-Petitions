import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpConfirmComponent } from './sign-up-confirm.component';
import { RouterModule } from '@angular/router';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignUpConfirmRoutingModule } from './sign-up-confirm-routing.module';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [SignUpConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    BasicCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    SignUpConfirmRoutingModule,
    ErrorMsgModule,
    LoadingBarModule,
  ],
})
export class SignUpConfirmModule {}
