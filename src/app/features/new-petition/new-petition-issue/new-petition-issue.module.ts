import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionIssueComponent } from './new-petition-issue.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { StepIndicatorModule } from '../step-indicator/step-indicator.module';
import { RouterModule } from '@angular/router';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    InputErrorModule,
    MatInputModule,
    MatIconModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [NewPetitionIssueComponent],
})
export class NewPetitionIssueModule {}
