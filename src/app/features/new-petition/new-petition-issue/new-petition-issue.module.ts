import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionIssueComponent } from './new-petition-issue.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { StepIndicatorModule } from '../step-indicator/step-indicator.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { NewPetitionIssueService } from 'src/app/logic/petition/new-petition-issue.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [NewPetitionIssueComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    StepIndicatorModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [NewPetitionIssueComponent],
})
export class NewPetitionIssueModule {}
