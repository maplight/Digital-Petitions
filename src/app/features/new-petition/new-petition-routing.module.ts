import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPetitionComponent } from './new-petition.component';

const routes: Routes = [
  {
    path: '',
    component: NewPetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPetitionRoutingModule {}
