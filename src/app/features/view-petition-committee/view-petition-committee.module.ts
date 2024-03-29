import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPetitionCommitteeComponent } from './view-petition-committee.component';
import { ViewPetitionCommitteeRoutingModule } from './view-petition-committee-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { CurrentResultModule } from './current-result/current-result.module';
import { GetPublicPetitionService } from 'src/app/logic/petition/get-public-petition.service';
import { MatButtonModule } from '@angular/material/button';
import { AlertWithdrawlPetitionModule } from './alert-withdrawl-petition/alert-withdrawl-petition.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ConfirmWithdrawlPetitionModule } from './confirm-withdrawl-petition/confirm-withdrawl-petition.module';
import { WithdrawlResultModule } from './withdrawl-result/withdrawl-result.module';
import { PetitionStatusModule } from 'src/app/pipes/petition-status/petition-status.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ViewPetitionNameService } from 'src/app/logic/petition/view-petition-name.service';

@NgModule({
  declarations: [ViewPetitionCommitteeComponent],
  providers: [ViewPetitionNameService],
  imports: [
    CommonModule,
    ViewPetitionCommitteeRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    PetitionViewModule,
    ReturnLinkModule,
    CurrentResultModule,
    MatButtonModule,
    AlertWithdrawlPetitionModule,
    ConfirmWithdrawlPetitionModule,
    MatDialogModule,
    RouterModule,
    WithdrawlResultModule,
    PetitionStatusModule,
    LoadingBarModule,
    ErrorMsgModule,
  ],
})
export class ViewPetitionCommitteeModule {}
