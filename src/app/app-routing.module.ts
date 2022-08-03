import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard, CityStaffGuard, CommitteeGuard } from './guards/exports';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'example',
    loadChildren: () =>
      import('./example/example.module').then((m) => m.ExampleModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    data: { showMenu: false, showDemo: true },
    children: [
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./auth/sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      {
        path: 'sign-up/:email',
        loadChildren: () =>
          import('./auth/sign-up-confirm/sign-up-confirm.module').then(
            (m) => m.SignUpConfirmModule
          ),
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
        path: 'set-new-password/:email',
        loadChildren: () =>
          import('./auth/set-new-password/set-new-password.module').then(
            (m) => m.SetNewPasswordModule
          ),
      },
      {
        path: 'success-change-password',
        loadChildren: () =>
          import('./auth/success-change/success-change.module').then(
            (m) => m.ConfirmModule
          ),
      },
    ],
  },
  {
    path: 'committee',
    canActivate: [CommitteeGuard],
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
      {
        path: 'new-petition',
        loadChildren: () =>
          import('./features/new-petition/new-petition.module').then(
            (m) => m.NewPetitionModule
          ),
      },
      {
        path: 'edit-petition/:id',
        loadChildren: () =>
          import('./features/edit-petition/edit-petition.module').then(
            (m) => m.EditPetitionModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./features/committee-home/committee-home.module').then(
            (m) => m.CommitteeHomeModule
          ),
      },
    ],
  },
  {
    path: 'city-staff',
    canActivate: [CityStaffGuard],
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
  providers: [CommitteeGuard],
})
export class AppRoutingModule {}
