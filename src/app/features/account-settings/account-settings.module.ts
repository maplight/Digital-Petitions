import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { ReturnLinkModule } from 'src/app/shared/return-link/return-link.module';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    ReturnLinkModule,
    BasicCardModule,
    MatButtonModule,
  ],
})
export class AccountSettingsModule {}
