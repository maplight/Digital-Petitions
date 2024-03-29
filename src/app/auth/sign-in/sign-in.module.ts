import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { SingInRoutingModule } from './sign-in-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    InputErrorModule,
    ReactiveFormsModule,
    InputErrorModule,
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
