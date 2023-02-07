import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortSignaturesComponent } from './sort-signatures.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SortSignaturesComponent],
  imports: [CommonModule, MatInputModule, MatSelectModule],
  exports: [SortSignaturesComponent],
})
export class SortSignaturesModule {}
