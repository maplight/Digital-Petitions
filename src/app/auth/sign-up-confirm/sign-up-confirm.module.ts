import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpConfirmComponent } from './sign-up-confirm.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignUpConfirmRoutingModule } from './sign-up-confirm-routing.module';
import { SignUpConfirmService } from 'src/app/logic/auth/sign-up-confirm.service';

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
  ],
  providers: [SignUpConfirmService],
})
export class SignUpConfirmModule {}
