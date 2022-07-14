import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogResultComponent } from './dialog-result.component';
import { MatIconModule } from '@angular/material/icon';
import { BasicModalModule } from 'src/app/shared/basic-modal/basic-modal.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogResultComponent],
  imports: [CommonModule, MatIconModule, BasicModalModule, MatButtonModule],
  exports: [DialogResultComponent],
})
export class DialogResultModule {}
