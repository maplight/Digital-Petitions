import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionCandidateComponent } from './edit-petition-candidate.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmEditPetitionModule } from '../confirm-edit-petition/confirm-edit-petition.module';
import { MatDialogModule } from '@angular/material/dialog';
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
    InputErrorModule,
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
