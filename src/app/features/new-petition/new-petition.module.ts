import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPetitionComponent } from './new-petition.component';
import { NewPetitionRoutingModule } from './new-petition-routing.module';

@NgModule({
  declarations: [NewPetitionComponent],
  imports: [CommonModule, NewPetitionRoutingModule],
})
export class NewPetitionModule {}
