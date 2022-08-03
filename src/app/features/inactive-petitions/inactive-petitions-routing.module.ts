import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactivePetitionsComponent } from './inactive-petitions.component';

const routes: Routes = [
  {
    path: '',
    component: InactivePetitionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InactivePetitionsRoutingModule {}
