import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { showMenu: false, showDemo: true },
    children: [
      {
        path: 'example',
        loadChildren: () =>
          import('./example/example.module').then((m) => m.ExampleModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    data: { showMenu: true, showDemo: true },
    children: [
      {
        path: 'city-staff',
        loadChildren: () =>
          import('./city-staff/city-staff.module').then(
            (m) => m.CityStaffModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
