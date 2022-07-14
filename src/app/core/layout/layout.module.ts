import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { RouterModule } from '@angular/router';
import { LayoutMaterialModule } from './layout-material.module';
import { SideMenuModule } from 'src/app/core/layout/side-menu/side-menu.module';
import { MatMenuModule } from '@angular/material/menu';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { ChangePasswordModalModule } from 'src/app/auth/change-password-modal/change-password-modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailChangeModalModule } from 'src/app/auth/email-change-modal/email-change-modal.module';
import { ChangePersonalDetailsModalModule } from 'src/app/auth/change-personal-details-modal/change-personal-details-modal.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    LayoutMaterialModule,
    SideMenuModule,
    MatMenuModule,
    BasicModalModule,
    ChangePasswordModalModule,
    EmailChangeModalModule,
    MatDialogModule,
    ChangePersonalDetailsModalModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
