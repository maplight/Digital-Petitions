import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionCardComponent } from './petition-card.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [PetitionCardComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  exports: [PetitionCardComponent],
})
export class PetitionCardModule {}
