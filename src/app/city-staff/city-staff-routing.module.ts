import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CityStaffComponent } from './city-staff.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: CityStaffComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityStaffRoutingModule {}
