import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPetitionInactiveComponent } from './view-petition-inactive.component';
import { ViewPetitionInactiveRoutingModule } from './view-petition-inactive-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { StatusModule } from './status/status.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';

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
    ErrorMsgModule,
    LoadingBarModule,
  ],
})
export class ViewPetitionInactiveModule {}
