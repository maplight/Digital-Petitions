import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InactivePetitionsComponent } from './inactive-petitions.component';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { InactivePetitionsRoutingModule } from './inactive-petitions-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { BasicFilterModule } from 'src/app/shared/basic-filter/basic-filter.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [InactivePetitionsComponent],
  imports: [
    CommonModule,
    InactivePetitionsRoutingModule,
    PetitionCardModule,
    ReturnLinkModule,
    BasicFilterModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class InactivePetitionsModule {}
