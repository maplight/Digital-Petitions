import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionTypePipe } from './petition-type.pipe';

@NgModule({
  declarations: [PetitionTypePipe],
  imports: [CommonModule],
  exports: [PetitionTypePipe],
})
export class PetitionTypeModule {}
