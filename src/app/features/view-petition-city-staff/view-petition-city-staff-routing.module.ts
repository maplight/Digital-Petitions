import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPetitionCityStaffComponent } from './view-petition-city-staff.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPetitionCityStaffComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPetitionCityStaffRoutingModule {}
