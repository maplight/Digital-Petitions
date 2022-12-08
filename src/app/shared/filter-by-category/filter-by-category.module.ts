import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByCategoryComponent as FilterByCategoryComponent } from './filter-by-category.component';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [FilterByCategoryComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [FilterByCategoryComponent],
})
export class FilterByCategoryModule {}
