import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteeHomeComponent } from './committee-home.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteeHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitteeHomeRoutingModule {}
