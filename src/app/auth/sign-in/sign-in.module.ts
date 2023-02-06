import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SingInRoutingModule } from './sign-in-routing.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [SignInComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SingInRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    BasicCardModule,
    MatProgressBarModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class SignInModule {}
