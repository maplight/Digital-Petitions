import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffPermissionsComponent } from './city-staff-permissions.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { CityStaffPermissionsRoutingModule } from './city-staff-permissions-routing.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

import { DialogModule } from '@angular/cdk/dialog';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { NewMemberModule } from './new-member/new-member.module';
import { ChangeAccountPermissionModule } from './change-account-permission/change-account-permission.module';

import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RemoveMemberModule } from './remove-member/remove-member.module';

@NgModule({
  declarations: [CityStaffPermissionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    CityStaffPermissionsRoutingModule,
    MatMenuModule,
    LoadingBarModule,
    ErrorMsgModule,

    DialogModule,
    DialogResultModule,
    NewMemberModule,
    ChangeAccountPermissionModule,

    MatDialogModule,
    RemoveMemberModule,
  ],
})
export class CityStaffPermissionsModule {}
