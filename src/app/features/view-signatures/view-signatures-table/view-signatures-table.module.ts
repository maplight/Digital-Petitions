import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignaturesTableComponent } from './view-signatures-table.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

@NgModule({
  declarations: [ViewSignaturesTableComponent],
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  exports: [ViewSignaturesTableComponent],
})
export class ViewSignaturesTableModule {}
