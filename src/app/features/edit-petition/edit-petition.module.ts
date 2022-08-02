import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionComponent } from './edit-petition.component';
import { RouterModule } from '@angular/router';
import { EditPetitionCandidateModule } from './edit-petition-candidate/edit-petition-candidate.module';
import { EditPetitionRoutingModule } from './edit-petition-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { EditResultPetitionModule } from './edit-result-petition/edit-result-petition.module';
import { MatIconModule } from '@angular/material/icon';
import { EditPetitionIssueModule } from './edit-petition-issue/edit-petition-issue.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EditPetitionComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditPetitionCandidateModule,
    EditPetitionIssueModule,
    EditPetitionRoutingModule,
    ReturnLinkModule,
    MatDialogModule,
    BasicModalModule,
    EditResultPetitionModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class EditPetitionModule {}
