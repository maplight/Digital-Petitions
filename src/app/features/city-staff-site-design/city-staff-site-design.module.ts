import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';
import { CityStaffSiteDesignRoutingModule } from './city-staff-site-design-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityStaffSiteDesignComponent],
  imports: [
    CommonModule,
    CityStaffSiteDesignRoutingModule,
    ReturnLinkModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CityStaffSiteDesignModule {}
