import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpConfirmComponent } from './sign-up-confirm.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
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
