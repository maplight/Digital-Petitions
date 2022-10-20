import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InactivePetitionsComponent } from './inactive-petitions.component';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { InactivePetitionsRoutingModule } from './inactive-petitions-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [InactivePetitionsComponent],
  imports: [
    CommonModule,
    InactivePetitionsRoutingModule,
    PetitionCardModule,
    ReturnLinkModule,
    FilterByCategoryModule,
    FilterByStatusModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class InactivePetitionsModule {}
