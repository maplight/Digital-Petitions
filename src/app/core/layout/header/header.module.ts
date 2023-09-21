import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { UserMenuModule } from '../user-menu/user-menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, UserMenuModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
