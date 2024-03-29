import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffPermissionsComponent } from './city-staff-permissions.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CityStaffPermissionsRoutingModule } from './city-staff-permissions-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

import { DialogModule } from '@angular/cdk/dialog';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { NewMemberModule } from './new-member/new-member.module';
import { ChangeAccountPermissionModule } from './change-account-permission/change-account-permission.module';

import { MatDialogModule } from '@angular/material/dialog';
import { RemoveMemberModule } from './remove-member/remove-member.module';
import { BasicSearchEngineModule } from 'src/app/shared/basic-search-engine/basic-search-engine.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    BasicSearchEngineModule,
    DialogModule,
    DialogResultModule,
    NewMemberModule,
    ChangeAccountPermissionModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    RemoveMemberModule,
  ],
})
export class CityStaffPermissionsModule {}
