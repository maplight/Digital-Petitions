import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityStaffPermissionsComponent } from './city-staff-permissions.component';

const routes: Routes = [{ path: '', component: CityStaffPermissionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityStaffPermissionsRoutingModule {}
