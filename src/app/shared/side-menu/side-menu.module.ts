import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { SideMenuMaterialModule } from './side-menu-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, SideMenuMaterialModule, RouterModule],
  exports: [SideMenuComponent],
})
export class SideMenuModule {}
