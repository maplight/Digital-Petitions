import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionIssueComponent } from './edit-petition-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [EditPetitionIssueComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [EditPetitionIssueComponent],
})
export class EditPetitionIssueModule {}
