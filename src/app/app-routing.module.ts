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
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./auth/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'set-new-password/:token',
        loadChildren: () =>
          import('./auth/set-new-password/set-new-password.module').then(
            (m) => m.SetNewPasswordModule
          ),
      },
      {
        path: 'new-petition',
        loadChildren: () =>
          import('./features/new-petition/new-petition.module').then(
            (m) => m.NewPetitionModule
          ),
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
    path: 'city-staff',
    component: LayoutComponent,
    data: { showMenu: true, showDemo: true },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./city-staff/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./city-staff/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
