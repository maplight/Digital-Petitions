import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignThisPetitionComponent } from './sign-this-petition.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
    RouterModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [SignThisPetitionComponent],
})
export class SignThisPetitionModule {}
