import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetNewPasswordComponent } from './set-new-password.component';

const routes: Routes = [
  {
    path: '',
    component: SetNewPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetNewPasswordRoutingModule {}
