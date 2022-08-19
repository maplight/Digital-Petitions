import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionStatusPipe } from './petition-status.pipe';

@NgModule({
  declarations: [PetitionStatusPipe],
  imports: [CommonModule],
  exports: [PetitionStatusPipe],
})
export class PetitionStatusModule {}
