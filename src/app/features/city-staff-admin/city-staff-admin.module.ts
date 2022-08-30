import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffAdminComponent } from './city-staff-admin.component';
import { CityStaffAdminRoutingModule } from './city-staff-admin-routing.module';

@NgModule({
  declarations: [CityStaffAdminComponent],
  imports: [CommonModule, CityStaffAdminRoutingModule],
})
export class CityStaffAdminModule {}
