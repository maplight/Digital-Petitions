import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnLinkComponent } from './return-link.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReturnLinkComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [ReturnLinkComponent],
})
export class ReturnLinkModule {}
