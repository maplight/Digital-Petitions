import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmSignPetitionComponent } from './confirm-sign-petition.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmSignPetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmSignPetitionRoutingModule {}
