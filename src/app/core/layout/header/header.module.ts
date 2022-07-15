import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { UserMenuModule } from '../user-menu/user-menu.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, UserMenuModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
