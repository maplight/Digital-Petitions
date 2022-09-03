import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityStaffSiteDesignComponent } from './city-staff-site-design.component';

const routes: Routes = [{ path: '', component: CityStaffSiteDesignComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityStaffSiteDesignRoutingModule {}
