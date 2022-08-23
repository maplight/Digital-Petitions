import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignaturesTableComponent } from './view-signatures-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ViewSignaturesTableComponent],
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  exports: [ViewSignaturesTableComponent],
})
export class ViewSignaturesTableModule {}
