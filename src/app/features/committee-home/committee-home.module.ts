import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteeHomeComponent } from './committee-home.component';
import { CommitteeHomeRoutingModule } from './committee-home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PetitionCardModule } from '../../shared/petition-card/petition-card.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GetPetitionsCommitteeService } from 'src/app/logic/committee/getPetitionsCommitteeService.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

@NgModule({
  declarations: [CommitteeHomeComponent],
  imports: [
    CommonModule,
    CommitteeHomeRoutingModule,
    MatButtonModule,
    RouterModule,
    PetitionCardModule,
    MatIconModule,
    MatProgressBarModule,
    LoadingBarModule,
  ],
  providers: [GetPetitionsCommitteeService],
})
export class CommitteeHomeModule {}
