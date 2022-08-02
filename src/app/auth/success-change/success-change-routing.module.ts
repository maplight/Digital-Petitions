import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessChangeComponent } from './success-change.component';

const routes: Routes = [
  {
    path: '',
    component: SuccessChangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessChangeRoutingModule {}
