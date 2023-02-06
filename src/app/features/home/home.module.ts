import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PetitionCardModule,
    MatButtonModule,
    RouterModule,
    FilterByCategoryModule,
    MatProgressBarModule,
    MatIconModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class HomeModule {}
