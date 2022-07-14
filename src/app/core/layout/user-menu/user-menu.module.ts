import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    AvatarModule,
  ],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}
