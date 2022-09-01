import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicFilterModule } from 'src/app/shared/basic-filter/basic-filter.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PetitionCardModule,
    MatButtonModule,
    RouterModule,
    BasicFilterModule,
    MatProgressBarModule,
    MatIconModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class HomeModule {}
