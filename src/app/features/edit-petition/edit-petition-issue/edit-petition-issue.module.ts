import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionIssueComponent } from './edit-petition-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { EditPetitionIssueService } from 'src/app/logic/petition/edit-petition-issue.service';
import { LoadingBarComponent } from 'src/app/shared/loading/loading-bar.component';
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
  providers: [EditPetitionIssueService],
})
export class EditPetitionIssueModule {}
