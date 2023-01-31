import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawlResultComponent } from './withdrawl-result.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WithdrawlResultComponent],
  imports: [
    CommonModule,
    BasicCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [WithdrawlResultComponent],
})
export class WithdrawlResultModule {}
