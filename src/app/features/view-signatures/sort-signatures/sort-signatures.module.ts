import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortSignaturesComponent } from './sort-signatures.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

@NgModule({
  declarations: [SortSignaturesComponent],
  imports: [CommonModule, MatInputModule, MatSelectModule],
  exports: [SortSignaturesComponent],
})
export class SortSignaturesModule {}
