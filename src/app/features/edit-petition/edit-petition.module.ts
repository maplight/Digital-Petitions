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

@NgModule({
  declarations: [EditPetitionComponent],
  imports: [
    CommonModule,
    RouterModule,
    EditPetitionCandidateModule,
    EditPetitionRoutingModule,
    ReturnLinkModule,
    MatDialogModule,
    BasicModalModule,
    EditResultPetitionModule,
    MatIconModule,
  ],
})
export class EditPetitionModule {}