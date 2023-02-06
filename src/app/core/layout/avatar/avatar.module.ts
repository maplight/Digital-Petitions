import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { DialogResultModule } from 'src/app/shared/dialog-result/dialog-result.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
