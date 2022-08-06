import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';
import { WithdrawlResultComponent } from './withdrawl-result/withdrawl-result.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPetitionCommitteeComponent,
  },
  {
    path: ':petition',
    component: WithdrawlResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPetitionCommitteeRoutingModule {}
