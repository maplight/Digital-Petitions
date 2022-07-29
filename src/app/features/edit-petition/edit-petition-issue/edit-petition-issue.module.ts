import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionIssueComponent } from './edit-petition-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  exports: [EditPetitionIssueComponent],
})
export class EditPetitionIssueModule {}
