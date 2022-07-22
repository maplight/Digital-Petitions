import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, BasicCardModule, MatButtonModule, RouterModule],
  exports: [ConfirmComponent],
})
export class ConfirmModule {}
