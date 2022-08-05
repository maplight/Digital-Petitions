import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPetitionCommitteeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPetitionCommitteeRoutingModule {}
