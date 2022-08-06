import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPetitionCandidateComponent } from './edit-petition-candidate.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmEditPetitionModule } from '../confirm-edit-petition/confirm-edit-petition.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { EditPetitionCandidateService } from 'src/app/logic/petition/edit-petition-candidate.service';

@NgModule({
  declarations: [EditPetitionCandidateComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ConfirmEditPetitionModule,
    MatDialogModule,
    BasicModalModule,
  ],
  exports: [EditPetitionCandidateComponent],
  providers: [EditPetitionCandidateService],
})
export class EditPetitionCandidateModule {}
