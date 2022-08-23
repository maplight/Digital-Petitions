import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CualifiedBoxComponent } from './cualified-box.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CualifiedBoxComponent],
  imports: [CommonModule, BasicCardModule, MatButtonModule],
  exports: [CualifiedBoxComponent],
})
export class CualifiedBoxModule {}
