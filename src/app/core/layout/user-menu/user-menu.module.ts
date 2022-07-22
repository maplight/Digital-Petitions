import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '../avatar/avatar.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { SignOutService } from '../../../logic/sign-out.service';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    AvatarModule,
    DialogResultModule,
    DialogModule,
    MatDialogModule,
  ],
  exports: [UserMenuComponent],
  providers: [SignOutService],
})
export class UserMenuModule {}
