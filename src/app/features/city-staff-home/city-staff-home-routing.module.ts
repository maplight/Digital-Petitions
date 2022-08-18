import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityStaffHomeComponent } from './city-staff-home.component';

const routes: Routes = [{ path: '', component: CityStaffHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityStaffHomeRoutingModule {}
