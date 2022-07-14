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
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./auth/sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/sign-in/sign-in.module').then((m) => m.SignInModule),
      },
    ],
  },
  {
    path: 'committee',
    component: LayoutComponent,
    data: { showMenu: false, showDemo: true },
    children: [
      {
        path: 'account-settings',
        loadChildren: () =>
          import(
            './features/committee-account-settings/committee-account-settings.module'
          ).then((m) => m.CommitteeAccountSettingsModule),
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
