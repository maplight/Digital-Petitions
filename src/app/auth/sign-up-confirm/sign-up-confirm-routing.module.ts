import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpConfirmComponent } from './sign-up-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpConfirmRoutingModule {}
