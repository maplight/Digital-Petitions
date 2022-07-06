import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitteeRoutingModule } from './committee-routing.module';
import { CommitteeComponent } from './committee.component';


@NgModule({
  declarations: [
    CommitteeComponent
  ],
  imports: [
    CommonModule,
    CommitteeRoutingModule
  ]
})
export class CommitteeModule { }
