import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffHomeComponent } from './city-staff-home.component';
import { CityStaffHomeRoutingModule } from './city-staff-home-routing.module';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { GetPetitionsActiveService } from 'src/app/logic/committee/getPetitionsActiveService.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PetitionCardModule } from 'src/app/shared/petition-card/petition-card.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { FilterByCategoryModule } from 'src/app/shared/filter-by-category/filter-by-category.module';
import { FilterByStatusModule } from 'src/app/shared/filter-by-status/filter-by-status.module';

@NgModule({
  declarations: [CityStaffHomeComponent],
  imports: [
    CommonModule,
    CityStaffHomeRoutingModule,
    BasicSearchEngineModule,
    FilterByCategoryModule,
    FilterByStatusModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    PetitionCardModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class CityStaffHomeModule {}
