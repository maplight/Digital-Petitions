import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultPetitionComponent } from './result-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResultPetitionComponent],
  imports: [CommonModule, BasicCardModule, MatButtonModule, RouterModule],
  exports: [ResultPetitionComponent],
})
export class ResultPetitionModule {}
