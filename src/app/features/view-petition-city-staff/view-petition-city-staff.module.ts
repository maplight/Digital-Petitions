import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPetitionCityStaffComponent } from './view-petition-city-staff.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PetitionViewModule } from 'src/app/shared/petition-view/petition-view.module';
import { CurrentResultCityStaffModule } from './current-result-city-staff/current-result-city-staff.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { RouterModule } from '@angular/router';
import { ViewPetitionCityStaffRoutingModule } from './view-petition-city-staff-routing.module';
import { GetPetitionService } from 'src/app/logic/petition/get-petition.service';
import { NewBoxModule } from './new-box/new-box.module';
import { CualifiedBoxModule } from './cualified-box/cualified-box.module';
import { ApproveDialogModule } from './approve-dialog/approve-dialog.module';
import { DenyAlertModule } from './deny-alert/deny-alert.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { DenyPetitionService } from 'src/app/logic/petition/deny-petition.service';

@NgModule({
  declarations: [ViewPetitionCityStaffComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    PetitionViewModule,
    CurrentResultCityStaffModule,
    ReturnLinkModule,
    RouterModule,
    ViewPetitionCityStaffRoutingModule,
    NewBoxModule,
    CualifiedBoxModule,
    ApproveDialogModule,
    DenyAlertModule,
    DialogResultModule,
  ],
  providers: [GetPetitionService, DenyPetitionService],
})
export class ViewPetitionCityStaffModule {}
