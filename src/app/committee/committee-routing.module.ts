import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteeComponent } from './committee.component';
import { SignUpCommitteeComponent } from '../auth/sign-up-committee/sign-up-committee.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteeComponent,
    children: [{ path: 'sing-up', component: SignUpCommitteeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitteeRoutingModule {}
