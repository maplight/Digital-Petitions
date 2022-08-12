import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPetitionComponent } from './sign-petition.component';

const routes: Routes = [
  {
    path: '',
    component: SignPetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPetitionRoutingModule {}
