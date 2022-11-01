import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualifiedBoxComponent } from './qualified-box.component';
import { BasicCardModule } from 'src/app/shared/basic-card/basic-card.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [QualifiedBoxComponent],
  imports: [CommonModule, BasicCardModule, MatButtonModule, RouterModule],
  exports: [QualifiedBoxComponent],
})
export class CualifiedBoxModule {}
