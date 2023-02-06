import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditResultPetitionComponent } from './edit-result-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { CutModule } from 'src/app/pipes/cut/cut.module';

@NgModule({
  declarations: [EditResultPetitionComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatButtonModule,
    RouterModule,
    CutModule,
  ],
  exports: [EditResultPetitionComponent],
})
export class EditResultPetitionModule {}
