import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultSignPetitionComponent } from './result-sign-petition.component';

const routes: Routes = [
  {
    path: '',
    component: ResultSignPetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultSignPetitionRoutingModule {}
