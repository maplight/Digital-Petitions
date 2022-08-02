import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteeHomeComponent } from './committee-home.component';
import { CommitteeHomeRoutingModule } from './committee-home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PetitionCardModule } from '../../shared/petition-card/petition-card.module';

@NgModule({
  declarations: [CommitteeHomeComponent],
  imports: [
    CommonModule,
    CommitteeHomeRoutingModule,
    MatButtonModule,
    RouterModule,
    PetitionCardModule,
  ],
})
export class CommitteeHomeModule {}
