import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByCategoryComponent as FilterByCategoryComponent } from './filter-by-category.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

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
