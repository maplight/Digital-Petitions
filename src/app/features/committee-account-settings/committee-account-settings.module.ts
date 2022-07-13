import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteeAccountSettingsComponent } from './committee-account-settings.component';
import { CommitteeAccountSettingsRoutingModule } from './committee-account-settings-routing.module';

@NgModule({
  declarations: [CommitteeAccountSettingsComponent],
  imports: [CommonModule, CommitteeAccountSettingsRoutingModule],
})
export class CommitteeAccountSettingsModule {}
