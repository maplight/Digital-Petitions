import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteeComponent } from './committee.component';
import { SingUpCommitteeComponent } from '../auth/sing-up-committee/sing-up-committee.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteeComponent,
    children: [{ path: 'sing-up', component: SingUpCommitteeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitteeRoutingModule {}
