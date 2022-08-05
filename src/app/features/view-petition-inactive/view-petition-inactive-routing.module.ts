import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPetitionInactiveComponent } from './view-petition-inactive.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPetitionInactiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPetitionInactiveRoutingModule {}
