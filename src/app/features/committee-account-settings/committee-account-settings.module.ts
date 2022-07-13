import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteeAccountSettingsComponent } from './committee-account-settings.component';
import { CommitteeAccountSettingsRoutingModule } from './committee-account-settings-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';

@NgModule({
  declarations: [CommitteeAccountSettingsComponent],
  imports: [
    CommonModule,
    CommitteeAccountSettingsRoutingModule,
    ReturnLinkModule,
  ],
})
export class CommitteeAccountSettingsModule {}
