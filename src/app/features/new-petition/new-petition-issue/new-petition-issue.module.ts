import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionIssueComponent } from './new-petition-issue.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { StepIndicatorModule } from '../step-indicator/step-indicator.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatProgressBarModule,
  ],
})
export class NewPetitionIssueModule {}
