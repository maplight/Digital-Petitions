import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnCodeFormComponent } from './return-code-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { ReturnCodeFormRoutingModule } from './return-code-form-routing.module';

@NgModule({
  declarations: [ReturnCodeFormComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ReturnLinkModule,
    LoadingBarModule,
    ErrorMsgModule,
    ReturnCodeFormRoutingModule,
  ],
})
export class ReturnCodeFormModule {}
