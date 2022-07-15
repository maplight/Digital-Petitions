import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteeAccountSettingsComponent } from './committee-account-settings.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteeAccountSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitteeAccountSettingsRoutingModule {}
