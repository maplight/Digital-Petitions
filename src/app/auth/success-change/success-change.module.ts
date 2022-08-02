import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessChangeComponent } from './success-change.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SuccessChangeRoutingModule } from './success-change-routing.module';

@NgModule({
  declarations: [SuccessChangeComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatButtonModule,
    RouterModule,
    SuccessChangeRoutingModule,
  ],
})
export class ConfirmModule {}
