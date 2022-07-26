import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPetitionIssueComponent } from './new-petition-issue/new-petition-issue.component';
import { NewPetitionComponent } from './new-petition.component';

const routes: Routes = [
  {
    path: '',
    component: NewPetitionComponent,
  },
  {
    path: 'issue',
    component: NewPetitionIssueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPetitionRoutingModule {}
