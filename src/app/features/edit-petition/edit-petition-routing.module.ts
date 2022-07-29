import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPetitionComponent } from './edit-petition.component';

const routes: Routes = [
  {
    path: '',
    component: EditPetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPetitionRoutingModule {}
