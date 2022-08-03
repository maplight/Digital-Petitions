import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicFilterModule } from 'src/app/shared/basic-filter/basic-filter.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PetitionCardModule,
    MatButtonModule,
    RouterModule,
    BasicFilterModule,
  ],
})
export class HomeModule {}
