import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ErrorMsgComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ErrorMsgComponent],
})
export class ErrorMsgModule {}
