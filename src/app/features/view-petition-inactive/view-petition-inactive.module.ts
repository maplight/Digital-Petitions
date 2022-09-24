import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPetitionInactiveComponent } from './view-petition-inactive.component';
import { ViewPetitionInactiveRoutingModule } from './view-petition-inactive-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { StatusModule } from './status/status.module';

@NgModule({
  declarations: [ViewPetitionInactiveComponent],
  imports: [
    CommonModule,
    ViewPetitionInactiveRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    PetitionViewModule,
    ReturnLinkModule,
    StatusModule,
  ],
})
export class ViewPetitionInactiveModule {}
