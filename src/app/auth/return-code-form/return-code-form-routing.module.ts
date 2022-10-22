import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnCodeFormComponent } from './return-code-form.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnCodeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnCodeFormRoutingModule {}
