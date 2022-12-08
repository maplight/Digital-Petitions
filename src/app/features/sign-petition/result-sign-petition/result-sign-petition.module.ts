import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSignPetitionComponent } from './result-sign-petition.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ResultSignPetitionRoutingModule } from './result-sign-petition-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ResultSignPetitionComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatButtonModule,
    ResultSignPetitionRoutingModule,
    MatIconModule,
  ],
})
export class ResultSignPetitionModule {}
