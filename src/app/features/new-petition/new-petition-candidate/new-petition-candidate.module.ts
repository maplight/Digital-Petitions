import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionCandidateComponent } from './new-petition-candidate.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  exports: [NewPetitionCandidateComponent],
})
export class NewPetitionCandidateModule {}
