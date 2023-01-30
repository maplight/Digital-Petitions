import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '../avatar/avatar.module';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { SignOutService } from 'src/app/logic/auth/exports';

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
})
export class UserMenuModule {}
