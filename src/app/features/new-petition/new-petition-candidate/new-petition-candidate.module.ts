import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionCandidateComponent } from './new-petition-candidate.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { InputErrorModule } from 'src/app/shared/input-error/input-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
    InputErrorModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
  exports: [NewPetitionCandidateComponent],
})
export class NewPetitionCandidateModule {}
