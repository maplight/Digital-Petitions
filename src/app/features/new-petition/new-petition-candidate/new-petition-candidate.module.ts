import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionCandidateComponent } from './new-petition-candidate.component';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NewPetitionCandidateService } from 'src/app/logic/petition/new-petition-candidate.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [NewPetitionCandidateComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    BasicCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [NewPetitionCandidateComponent],
})
export class NewPetitionCandidateModule {}
