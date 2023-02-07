import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignThisPetitionComponent } from './sign-this-petition.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [SignThisPetitionComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InputErrorModule,
    RouterModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [SignThisPetitionComponent],
})
export class SignThisPetitionModule {}
