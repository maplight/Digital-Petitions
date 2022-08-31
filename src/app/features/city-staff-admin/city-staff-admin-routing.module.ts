import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityStaffAdminComponent } from './city-staff-admin.component';

const routes: Routes = [{ path: '', component: CityStaffAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityStaffAdminRoutingModule {}
