import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSignaturesComponent } from './view-signatures.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSignaturesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSignaturesRoutingModule {}
