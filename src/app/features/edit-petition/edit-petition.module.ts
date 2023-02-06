import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionComponent } from './edit-petition.component';
import { RouterModule } from '@angular/router';
import { EditPetitionCandidateModule } from './edit-petition-candidate/edit-petition-candidate.module';
import { EditPetitionRoutingModule } from './edit-petition-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { EditResultPetitionModule } from './edit-result-petition/edit-result-petition.module';
import { MatIconModule } from '@angular/material/icon';
import { EditPetitionIssueModule } from './edit-petition-issue/edit-petition-issue.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

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
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class EditPetitionModule {}
