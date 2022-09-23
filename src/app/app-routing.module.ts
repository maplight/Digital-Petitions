import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {
  NoAuthGuard,
  CommitteeGuard,
  AnonimousGuard,
  AccountSettingGuard,
  CityStaffHomeGuard,
  CityStaffAdminGuard,
} from './guards/exports';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'example',
    loadChildren: () =>
      import('./example/example.module').then((m) => m.ExampleModule),
  },
  {
    path: 'account-setting',
    component: LayoutComponent,
    canActivate: [AccountSettingGuard],
    loadChildren: () =>
      import('./features/account-settings/account-settings.module').then(
        (m) => m.AccountSettingsModule
      ),
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home/:id',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import('./features/sign-petition/sign-petition.module').then(
        (m) => m.SignPetitionModule
      ),
  },
  {
    path: 'petition/result-confirm-code/:title',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import(
        './features/sign-petition/result-sign-petition/result-sign-petition.module'
      ).then((m) => m.ResultSignPetitionModule),
  },
  {
    path: 'petition/confirm-code',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import(
        './features/sign-petition/confirm-sign-petition/confirm-sign-petition.module'
      ).then((m) => m.ConfirmSignPetitionModule),
  },
  {
    path: 'inactive-petitions',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import('./features/inactive-petitions/inactive-petitions.module').then(
        (m) => m.InactivePetitionsModule
      ),
  },
  {
    path: 'inactive-petitions/:id',
    component: LayoutComponent,
    canActivate: [AnonimousGuard],
    loadChildren: () =>
      import(
        './features/view-petition-inactive/view-petition-inactive.module'
      ).then((m) => m.ViewPetitionInactiveModule),
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
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
      {
        path: 'home/:id',
        loadChildren: () =>
          import(
            './features/view-petition-committee/view-petition-committee.module'
          ).then((m) => m.ViewPetitionCommitteeModule),
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
        canActivate: [CityStaffHomeGuard],
        loadChildren: () =>
          import('./features/city-staff-home/city-staff-home.module').then(
            (m) => m.CityStaffHomeModule
          ),
      },
      {
        path: 'home/:id',
        canActivate: [CityStaffHomeGuard],
        loadChildren: () =>
          import(
            './features/view-petition-city-staff/view-petition-city-staff.module'
          ).then((m) => m.ViewPetitionCityStaffModule),
      },
      {
        path: 'home/:id/signatures',
        canActivate: [CityStaffHomeGuard],
        loadChildren: () =>
          import('./features/view-signatures/view-signatures.module').then(
            (m) => m.ViewSignaturesModule
          ),
      },
      {
        path: 'admin',
        canActivate: [CityStaffAdminGuard],
        loadChildren: () =>
          import('./features/city-staff-admin/city-staff-admin.module').then(
            (m) => m.CityStaffAdminModule
          ),
      },
      {
        path: 'permissions',
        canActivate: [CityStaffAdminGuard],
        loadChildren: () =>
          import(
            './features/city-staff-permissions/city-staff-permissions.module'
          ).then((m) => m.CityStaffPermissionsModule),
      },
      {
        path: 'site-design',
        canActivate: [CityStaffAdminGuard],
        loadChildren: () =>
          import(
            './features/city-staff-site-design/city-staff-site-design.module'
          ).then((m) => m.CityStaffSiteDesignModule),
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
