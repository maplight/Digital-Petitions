import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { RouterModule } from '@angular/router';
import { LayoutMaterialModule } from './layout-material.module';
import { SideMenuModule } from 'src/app/core/layout/side-menu/side-menu.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
    LayoutMaterialModule,
    SideMenuModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
