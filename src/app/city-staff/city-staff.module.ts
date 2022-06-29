import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityStaffRoutingModule } from './city-staff-routing.module';
import { CityStaffComponent } from './city-staff.component';


@NgModule({
  declarations: [
    CityStaffComponent
  ],
  imports: [
    CommonModule,
    CityStaffRoutingModule
  ]
})
export class CityStaffModule { }
