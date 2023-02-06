import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { RouterModule } from '@angular/router';
import { SideMenuModule } from 'src/app/core/layout/side-menu/side-menu.module';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { ChangePasswordModalModule } from 'src/app/auth/change-password-modal/change-password-modal.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { EmailChangeModalModule } from 'src/app/auth/email-change-modal/email-change-modal.module';
import { ChangePersonalDetailsModalModule } from 'src/app/auth/change-personal-details-modal/change-personal-details-modal.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    SideMenuModule,
    MatMenuModule,
    BasicModalModule,
    ChangePasswordModalModule,
    EmailChangeModalModule,
    MatDialogModule,
    ChangePersonalDetailsModalModule,
    MatSidenavModule,
    MatButtonModule,
    DialogResultModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
