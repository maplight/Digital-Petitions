import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionCardComponent } from './petition-card.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CutModule } from 'src/app/pipes/cut/cut.module';
import { RouterModule } from '@angular/router';
import { PetitionTypeModule } from 'src/app/pipes/petition-type/petition-type.module';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';

@NgModule({
  declarations: [PetitionCardComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CutModule,
    RouterModule,
    PetitionTypeModule,
    PetitionStatusModule,
  ],
  exports: [PetitionCardComponent],
})
export class PetitionCardModule {}
