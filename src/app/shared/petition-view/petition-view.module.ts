import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionViewComponent } from './petition-view.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CutModule } from 'src/app/pipes/cut/cut.module';
import { PetitionTypeModule } from 'src/app/pipes/petition-type/petition-type.module';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';

@NgModule({
  declarations: [PetitionViewComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CutModule,
    PetitionTypeModule,
    PetitionStatusModule,
  ],
  exports: [PetitionViewComponent],
})
export class PetitionViewModule {}
