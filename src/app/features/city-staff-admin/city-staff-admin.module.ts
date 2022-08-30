import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffAdminComponent } from './city-staff-admin.component';
import { CityStaffAdminRoutingModule } from './city-staff-admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CityStaffAdminComponent],
  imports: [
    CommonModule,
    CityStaffAdminRoutingModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class CityStaffAdminModule {}
