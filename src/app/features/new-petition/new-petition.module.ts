import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionComponent } from './new-petition.component';
import { NewPetitionRoutingModule } from './new-petition-routing.module';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NewPetitionIssueModule } from './new-petition-issue/new-petition-issue.module';
import { RouterModule } from '@angular/router';
import { StepIndicatorModule } from './step-indicator/step-indicator.module';
import { SelectTypePetitionModule } from './select-type-petition/select-type-petition.module';
import { ResultPetitionModule } from './result-petition/result-petition.module';
import { NewPetitionCandidateModule } from './new-petition-candidate/new-petition-candidate.module';
import { StepIndicatorService } from 'src/app/logic/petition/step-indicator.service';

@NgModule({
  declarations: [NewPetitionComponent],
  imports: [
    CommonModule,
    NewPetitionRoutingModule,
    BasicCardModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    NewPetitionIssueModule,
    RouterModule,
    StepIndicatorModule,
    SelectTypePetitionModule,
    ResultPetitionModule,
    NewPetitionCandidateModule,
  ],
})
export class NewPetitionModule {}
