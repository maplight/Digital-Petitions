import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionCandidateComponent } from './edit-petition-candidate.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ConfirmEditPetitionModule } from '../confirm-edit-petition/confirm-edit-petition.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { EditPetitionCandidateService } from 'src/app/logic/petition/edit-petition-candidate.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [EditPetitionCandidateComponent],
  imports: [
    CommonModule,
    BasicCardModule,

    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ConfirmEditPetitionModule,
    MatDialogModule,
    BasicModalModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [EditPetitionCandidateComponent],
})
export class EditPetitionCandidateModule {}
