import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityStaffPermissionsComponent } from './city-staff-permissions.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CityStaffPermissionsRoutingModule } from './city-staff-permissions-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingBarModule } from 'src/app/shared/loading/loading-bar.module';
import { ErrorMsgModule } from 'src/app/shared/error-msg/error-msg.module';

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
  ],
})
export class CityStaffPermissionsModule {}
