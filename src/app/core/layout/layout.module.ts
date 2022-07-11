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
    MatDialogModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
